// moment-timezone.js
// version : 0.0.3
// author : Tim Wood
// license : MIT
// github.com/timrwood/moment-timezone

(function () {

	var VERSION = "0.0.3";

	function onload(moment) {
		var oldZoneName = moment.fn.zoneName,
			oldZoneAbbr = moment.fn.zoneAbbr,

			defaultRule,
			rules = {},
			ruleSets = {},
			zones = {},
			zoneSets = {},
			links = {},

			TIME_RULE_WALL_CLOCK = 0,
			TIME_RULE_UTC        = 1,
			TIME_RULE_STANDARD   = 2,

			DAY_RULE_DAY_OF_MONTH   = 7,
			DAY_RULE_LAST_WEEKDAY   = 8;

		// converts time in the HH:mm:ss format to absolute number of minutes
		function parseMinutes (input) {
			input = input + '';
			var output = input.split(':'),
				sign = ~input.indexOf('-') ? -1 : 1,
				hour = Math.abs(+output[0]),
				minute = parseInt(output[1], 10) || 0,
				second = parseInt(output[2], 10) || 0;

			return sign * ((hour * 60) + (minute) + (second / 60));
		}

		/************************************
			Rules
		************************************/

		function Rule (name, startYear, endYear, month, day, dayRule, time, timeRule, offset, letters) {
			this.name      = name;
			this.startYear = +startYear;
			this.endYear   = +endYear;
			this.month     = +month;
			this.day       = +day;
			this.dayRule   = +dayRule;
			this.time      = parseMinutes(time);
			this.timeRule  = +timeRule;
			this.offset    = parseMinutes(offset);
			this.letters   = letters || '';
			this.date = memoize(this.date);
			this.weekdayAfter = memoize(this.weekdayAfter);
			this.lastWeekday = memoize(this.lastWeekday);
		}

		Rule.prototype = {
			contains : function (year) {
				return (year >= this.startYear && year <= this.endYear);
			},

			start : function (year) {
				year = Math.min(Math.max(year, this.startYear), this.endYear);
				return moment.utc([year, this.month, this.date(year), 0, this.time]);
			},

			date : function (year) {
				if (this.dayRule === DAY_RULE_DAY_OF_MONTH) {
					return this.day;
				} else if (this.dayRule === DAY_RULE_LAST_WEEKDAY) {
					return this.lastWeekday(year);
				}
				return this.weekdayAfter(year);
			},

			weekdayAfter : function (year) {
				var day = this.day,
					firstDayOfWeek = moment([year, this.month, 1]).day(),
					output = this.dayRule + 1 - firstDayOfWeek;

				while (output < day) {
					output += 7;
				}

				return output;
			},

			lastWeekday : function (year) {
				var day = this.day,
					dow = day % 7,
					lastDowOfMonth = moment([year, this.month + 1, 1]).day(),
					daysInMonth = moment([year, this.month, 1]).daysInMonth(),
					output = daysInMonth + (dow - (lastDowOfMonth - 1)) - (~~(day / 7) * 7);

				if (dow >= lastDowOfMonth) {
					output -= 7;
				}
				return output;
			}
		};

		/************************************
			Rule Year
		************************************/

		function RuleYear (year, rule) {
			this.rule = rule;
			this.start = rule.start(year);
		}

		RuleYear.prototype = {
			equals : function (other) {
				if (!other || other.rule !== this.rule) {
					return false;
				}
				return Math.abs(other.start - this.start) < 86400000; // 24 * 60 * 60 * 1000
			}
		};

		function sortRuleYears (a, b) {
			if (a.isLast) {
				return -1;
			}
			if (b.isLast) {
				return 1;
			}
			return b.start - a.start;
		}

		/************************************
			Rule Sets
		************************************/

		function RuleSet (name) {
			this.name = name;
			this.rules = [];
			this.lastYearRule = memoize(this.lastYearRule);
		}

		RuleSet.prototype = {
			add : function (rule) {
				this.rules.push(rule);
			},

			ruleYears : function (mom, lastZone) {
				var i, j,
					year = mom.year(),
					rule,
					lastZoneRule,
					rules = [];

				for (i = 0; i < this.rules.length; i++) {
					rule = this.rules[i];
					if (rule.contains(year)) {
						rules.push(new RuleYear(year, rule));
					} else if (rule.contains(year + 1)) {
						rules.push(new RuleYear(year + 1, rule));
					}
				}
				rules.push(new RuleYear(year - 1, this.lastYearRule(year - 1)));

				if (lastZone) {
					lastZoneRule = new RuleYear(year - 1, lastZone.lastRule());
					lastZoneRule.start = lastZone.until.clone().utc();
					lastZoneRule.isLast = lastZone.ruleSet !== this;
					rules.push(lastZoneRule);
				}

				rules.sort(sortRuleYears);
				return rules;
			},

			rule : function (mom, offset, lastZone) {
				var rules = this.ruleYears(mom, lastZone),
					lastOffset = 0,
					rule,
					lastZoneOffset,
					lastZoneOffsetAbs,
					lastRule,
					i;

				if (lastZone) {
					lastZoneOffset = lastZone.offset + lastZone.lastRule().offset;
					lastZoneOffsetAbs = Math.abs(lastZoneOffset) * 90000;
				}

				// make sure to include the previous rule's offset
				for (i = rules.length - 1; i > -1; i--) {
					lastRule = rule;
					rule = rules[i];

					if (rule.equals(lastRule)) {
						continue;
					}

					if (lastZone && !rule.isLast && Math.abs(rule.start - lastZone.until) <= lastZoneOffsetAbs) {
						lastOffset += lastZoneOffset - offset;
					}

					if (rule.rule.timeRule === TIME_RULE_STANDARD) {
						lastOffset = offset;
					}

					if (rule.rule.timeRule !== TIME_RULE_UTC) {
						rule.start.add('m', -lastOffset);
					}

					lastOffset = rule.rule.offset + offset;
				}

				for (i = 0; i < rules.length; i++) {
					rule = rules[i];
					if (mom >= rule.start && !rule.isLast) {
						return rule.rule;
					}
				}

				return defaultRule;
			},

			lastYearRule : function (year) {
				var i,
					rule,
					start,
					bestRule = defaultRule,
					largest = -1e30;

				for (i = 0; i < this.rules.length; i++) {
					rule = this.rules[i];
					if (year >= rule.startYear) {
						start = rule.start(year);
						if (start > largest) {
							largest = start;
							bestRule = rule;
						}
					}
				}

				return bestRule;
			}
		};

		/************************************
			Zone
		************************************/

		function Zone (name, offset, ruleSet, letters, until, untilOffset) {
			var i,
				untilArray = typeof until === 'string' ? until.split('_') : [9999];

			this.name = name;
			this.offset = parseMinutes(offset);
			this.ruleSet = ruleSet;
			this.letters = letters;
			this.lastRule = memoize(this.lastRule);

			for (i = 0; i < untilArray.length; i++) {
				untilArray[i] = +untilArray[i];
			}
			this.until = moment.utc(untilArray).subtract('m', parseMinutes(untilOffset));
		}

		Zone.prototype = {
			rule : function (mom, lastZone) {
				return this.ruleSet.rule(mom, this.offset, lastZone);
			},

			lastRule : function () {
				return this.rule(this.until);
			},

			format : function (rule) {
				return this.letters.replace("%s", rule.letters);
			}
		};

		/************************************
			Zone Set
		************************************/

		function sortZones (a, b) {
			return a.until - b.until;
		}

		function ZoneSet (name) {
			this.name = normalizeName(name);
			this.displayName = name;
			this.zones = [];
			this.zoneAndRule = memoize(this.zoneAndRule, function (mom) {
				return +mom;
			});
		}

		ZoneSet.prototype = {
			zoneAndRule : function (mom) {
				var i,
					zone,
					lastZone;

				mom = mom.clone().utc();
				for (i = 0; i < this.zones.length; i++) {
					zone = this.zones[i];
					if (mom < zone.until) {
						break;
					}
					lastZone = zone;
				}

				return [zone, zone.rule(mom, lastZone)];
			},

			add : function (zone) {
				this.zones.push(zone);
				this.zones.sort(sortZones);
			},

			format : function (mom) {
				var zoneAndRule = this.zoneAndRule(mom);
				return zoneAndRule[0].format(zoneAndRule[1]);
			},

			offset : function (mom) {
				var zoneAndRule = this.zoneAndRule(mom);
				return -(zoneAndRule[0].offset + zoneAndRule[1].offset);
			}
		};

		/************************************
			Global Methods
		************************************/

		function memoize (fn, keyFn) {
			var cache = {};
			return function (first) {
				var key = keyFn ? keyFn.apply(this, arguments) : first;
				return key in cache ?
					cache[key] :
					(cache[key] = fn.apply(this, arguments));
			};
		}

		function addRules (rules) {
			var i, j, rule;
			for (i in rules) {
				rule = rules[i];
				for (j = 0; j < rule.length; j++) {
					addRule(i + '\t' + rule[j]);
				}
			}
		}

		function addRule (ruleString) {
			// don't duplicate rules
			if (rules[ruleString]) {
				return rules[ruleString];
			}

			var p = ruleString.split(/\s/),
				name = normalizeName(p[0]),
				rule = new Rule(name, p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10]);

			// cache the rule so we don't add it again
			rules[ruleString] = rule;

			// add to the ruleset
			getRuleSet(name).add(rule);

			return rule;
		}

		function normalizeName (name) {
			return (name || '').toLowerCase().replace(/\//g, '_');
		}

		function addZones (zones) {
			var i, j, zone;
			for (i in zones) {
				zone = zones[i];
				for (j = 0; j < zone.length; j++) {
					addZone(i + '\t' + zone[j]);
				}
			}
		}

		function addLinks (linksToAdd) {
			var i;
			for (i in linksToAdd) {
				links[normalizeName(i)] = normalizeName(linksToAdd[i]);
			}
		}

		function addZone (zoneString) {
			// don't duplicate zones
			if (zones[zoneString]) {
				return zones[zoneString];
			}

			var p = zoneString.split(/\s/),
				name = normalizeName(p[0]),
				zone = new Zone(name, p[1], getRuleSet(p[2]), p[3], p[4], p[5]);

			// cache the zone so we don't add it again
			zones[zoneString] = zone;

			// add to the zoneset
			getZoneSet(p[0]).add(zone);

			return zone;
		}

		function getRuleSet (name) {
			name = normalizeName(name);
			if (!ruleSets[name]) {
				ruleSets[name] = new RuleSet(name);
			}
			return ruleSets[name];
		}

		function getZoneSet (name) {
			var machineName = normalizeName(name);
			if (links[machineName]) {
				machineName = links[machineName];
			}
			if (!zoneSets[machineName]) {
				zoneSets[machineName] = new ZoneSet(name);
			}
			return zoneSets[machineName];
		}

		function add (data) {
			if (!data) {
				return;
			}
			if (data.zones) {
				addZones(data.zones);
			}
			if (data.rules) {
				addRules(data.rules);
			}
			if (data.links) {
				addLinks(data.links);
			}
		}

		// overwrite moment.updateOffset
		moment.updateOffset = function (mom, dontAdjustTime) {
			var offset;
			if (mom._z) {
				offset = mom._z.offset(mom);
				if (Math.abs(offset) < 16) {
					offset = offset / 60;
				}
				mom.zone(offset, !dontAdjustTime);
			}
		};

		function getZoneSets() {
			var sets = [],
				zoneName;
			for (zoneName in zoneSets) {
				sets.push(zoneSets[zoneName]);
			}
			return sets;
		}

		moment.fn.tz = function (name) {
			if (name) {
				this._z = getZoneSet(name);
				if (this._z) {
					moment.updateOffset(this);
				}
				return this;
			}
			if (this._z) {
				return this._z.displayName;
			}
		};

		moment.fn.zoneName = function () {
			if (this._z) {
				return this._z.format(this);
			}
			return oldZoneName.call(this);
		};

		moment.fn.zoneAbbr = function () {
			if (this._z) {
				return this._z.format(this);
			}
			return oldZoneAbbr.call(this);
		};

		moment.tz = function () {
			var args = [], i, len = arguments.length - 1;
			for (i = 0; i < len; i++) {
				args[i] = arguments[i];
			}
			var m = moment.apply(null, args);
			var preTzOffset = m.zone();
			m.tz(arguments[len]);
			return m.add('minutes', m.zone() - preTzOffset);
		};

		moment.tz.add = add;
		moment.tz.addRule = addRule;
		moment.tz.addZone = addZone;
		moment.tz.zones = getZoneSets;

		moment.tz.version = VERSION;

		// add default rule
		defaultRule = addRule("- 0 9999 0 0 0 0 0 0");

		return moment;
	}

	if (typeof define === "function" && define.amd) {
		define("moment-timezone", ["moment"], onload);
	} else if (typeof module !== 'undefined') {
		module.exports = onload(require('moment'));
	} else if (typeof window !== "undefined" && window.moment) {
		onload(window.moment);
	}
}).apply(this);
moment.tz.add({
    "zones": {
        "America/Adak": [
            "12:13:21 - LMT 1867_9_18 12:13:21",
            "-11:46:38 - LMT 1900_7_20_12 -11:46:38",
            "-11 - NST 1942 -11",
            "-11 US N%sT 1946 -11",
            "-11 - NST 1967_3 -11",
            "-11 - BST 1969 -11",
            "-11 US B%sT 1983_9_30_2 -10",
            "-10 US AH%sT 1983_10_30 -10",
            "-10 US HA%sT"
        ],
        "America/Anchorage": [
            "14:0:24 - LMT 1867_9_18 14:0:24",
            "-9:59:36 - LMT 1900_7_20_12 -9:59:36",
            "-10 - CAT 1942 -10",
            "-10 US CAT/CAWT 1945_7_14_23",
            "-10 US CAT/CAPT 1946 -10",
            "-10 - CAT 1967_3 -10",
            "-10 - AHST 1969 -10",
            "-10 US AH%sT 1983_9_30_2 -9",
            "-9 US Y%sT 1983_10_30 -9",
            "-9 US AK%sT"
        ],
        "America/Anguilla": [
            "-4:12:16 - LMT 1912_2_2 -4:12:16",
            "-4 - AST"
        ],
        "America/Antigua": [
            "-4:7:12 - LMT 1912_2_2 -4:7:12",
            "-5 - EST 1951 -5",
            "-4 - AST"
        ],
        "America/Araguaina": [
            "-3:12:48 - LMT 1914 -3:12:48",
            "-3 Brazil BR%sT 1990_8_17 -3",
            "-3 - BRT 1995_8_14 -3",
            "-3 Brazil BR%sT 2003_8_24 -3",
            "-3 - BRT 2012_9_21 -3",
            "-3 Brazil BR%sT"
        ],
        "America/Argentina/Buenos_Aires": [
            "-3:53:48 - LMT 1894_9_31 -3:53:48",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 Arg AR%sT"
        ],
        "America/Argentina/Catamarca": [
            "-4:23:8 - LMT 1894_9_31 -4:23:8",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1991_2_3 -2",
            "-4 - WART 1991_9_20 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 - ART 2004_5_1 -3",
            "-4 - WART 2004_5_20 -4",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Argentina/Cordoba": [
            "-4:16:48 - LMT 1894_9_31 -4:16:48",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1991_2_3 -2",
            "-4 - WART 1991_9_20 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 Arg AR%sT"
        ],
        "America/Argentina/Jujuy": [
            "-4:21:12 - LMT 1894_9_31 -4:21:12",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1990_2_4 -2",
            "-4 - WART 1990_9_28 -4",
            "-3 - WARST 1991_2_17 -3",
            "-4 - WART 1991_9_6 -4",
            "-2 - ARST 1992 -2",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Argentina/La_Rioja": [
            "-4:27:24 - LMT 1894_9_31 -4:27:24",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1991_2_1 -2",
            "-4 - WART 1991_4_7 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 - ART 2004_5_1 -3",
            "-4 - WART 2004_5_20 -4",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Argentina/Mendoza": [
            "-4:35:16 - LMT 1894_9_31 -4:35:16",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1990_2_4 -2",
            "-4 - WART 1990_9_15 -4",
            "-3 - WARST 1991_2_1 -3",
            "-4 - WART 1991_9_15 -4",
            "-3 - WARST 1992_2_1 -3",
            "-4 - WART 1992_9_18 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 - ART 2004_4_23 -3",
            "-4 - WART 2004_8_26 -4",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Argentina/Rio_Gallegos": [
            "-4:36:52 - LMT 1894_9_31 -4:36:52",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 - ART 2004_5_1 -3",
            "-4 - WART 2004_5_20 -4",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Argentina/Salta": [
            "-4:21:40 - LMT 1894_9_31 -4:21:40",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1991_2_3 -2",
            "-4 - WART 1991_9_20 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Argentina/San_Juan": [
            "-4:34:4 - LMT 1894_9_31 -4:34:4",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1991_2_1 -2",
            "-4 - WART 1991_4_7 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 - ART 2004_4_31 -3",
            "-4 - WART 2004_6_25 -4",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Argentina/San_Luis": [
            "-4:25:24 - LMT 1894_9_31 -4:25:24",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1990 -2",
            "-2 - ARST 1990_2_14 -2",
            "-4 - WART 1990_9_15 -4",
            "-3 - WARST 1991_2_1 -3",
            "-4 - WART 1991_5_1 -4",
            "-3 - ART 1999_9_3 -3",
            "-3 - WARST 2000_2_3 -3",
            "-3 - ART 2004_4_31 -3",
            "-4 - WART 2004_6_25 -4",
            "-3 Arg AR%sT 2008_0_21 -2",
            "-4 SanLuis WAR%sT"
        ],
        "America/Argentina/Tucuman": [
            "-4:20:52 - LMT 1894_9_31 -4:20:52",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1991_2_3 -2",
            "-4 - WART 1991_9_20 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 - ART 2004_5_1 -3",
            "-4 - WART 2004_5_13 -4",
            "-3 Arg AR%sT"
        ],
        "America/Argentina/Ushuaia": [
            "-4:33:12 - LMT 1894_9_31 -4:33:12",
            "-4:16:48 - CMT 1920_4 -4:16:48",
            "-4 - ART 1930_11 -4",
            "-4 Arg AR%sT 1969_9_5 -4",
            "-3 Arg AR%sT 1999_9_3 -3",
            "-4 Arg AR%sT 2000_2_3 -3",
            "-3 - ART 2004_4_30 -3",
            "-4 - WART 2004_5_20 -4",
            "-3 Arg AR%sT 2008_9_18 -3",
            "-3 - ART"
        ],
        "America/Aruba": [
            "-4:40:24 - LMT 1912_1_12 -4:40:24",
            "-4:30 - ANT 1965 -4:30",
            "-4 - AST"
        ],
        "America/Asuncion": [
            "-3:50:40 - LMT 1890 -3:50:40",
            "-3:50:40 - AMT 1931_9_10 -3:50:40",
            "-4 - PYT 1972_9 -4",
            "-3 - PYT 1974_3 -3",
            "-4 Para PY%sT"
        ],
        "America/Atikokan": [
            "-6:6:28 - LMT 1895 -6:6:28",
            "-6 Canada C%sT 1940_8_29 -6",
            "-5 - CDT 1942_1_9_2 -6",
            "-6 Canada C%sT 1945_8_30_2 -5",
            "-5 - EST"
        ],
        "America/Bahia": [
            "-2:34:4 - LMT 1914 -2:34:4",
            "-3 Brazil BR%sT 2003_8_24 -3",
            "-3 - BRT 2011_9_16 -3",
            "-3 Brazil BR%sT 2012_9_21 -3",
            "-3 - BRT"
        ],
        "America/Bahia_Banderas": [
            "-7:1 - LMT 1921_11_31_23_59 -7:1",
            "-7 - MST 1927_5_10_23 -7",
            "-6 - CST 1930_10_15 -6",
            "-7 - MST 1931_4_1_23 -7",
            "-6 - CST 1931_9 -6",
            "-7 - MST 1932_3_1 -7",
            "-6 - CST 1942_3_24 -6",
            "-7 - MST 1949_0_14 -7",
            "-8 - PST 1970 -8",
            "-7 Mexico M%sT 2010_3_4_2 -7",
            "-6 Mexico C%sT"
        ],
        "America/Barbados": [
            "-3:58:29 - LMT 1924 -3:58:29",
            "-3:58:29 - BMT 1932 -3:58:29",
            "-4 Barb A%sT"
        ],
        "America/Belem": [
            "-3:13:56 - LMT 1914 -3:13:56",
            "-3 Brazil BR%sT 1988_8_12 -3",
            "-3 - BRT"
        ],
        "America/Belize": [
            "-5:52:48 - LMT 1912_3 -5:52:48",
            "-6 Belize C%sT"
        ],
        "America/Blanc-Sablon": [
            "-3:48:28 - LMT 1884 -3:48:28",
            "-4 Canada A%sT 1970 -4",
            "-4 - AST"
        ],
        "America/Boa_Vista": [
            "-4:2:40 - LMT 1914 -4:2:40",
            "-4 Brazil AM%sT 1988_8_12 -4",
            "-4 - AMT 1999_8_30 -4",
            "-4 Brazil AM%sT 2000_9_15 -3",
            "-4 - AMT"
        ],
        "America/Bogota": [
            "-4:56:16 - LMT 1884_2_13 -4:56:16",
            "-4:56:16 - BMT 1914_10_23 -4:56:16",
            "-5 CO CO%sT"
        ],
        "America/Boise": [
            "-7:44:49 - LMT 1883_10_18_12_15_11 -7:44:49",
            "-8 US P%sT 1923_4_13_2 -8",
            "-7 US M%sT 1974 -7",
            "-7 - MST 1974_1_3_2 -7",
            "-7 US M%sT"
        ],
        "America/Cambridge_Bay": [
            "0 - zzz 1920",
            "-7 NT_YK M%sT 1999_9_31_2 -6",
            "-6 Canada C%sT 2000_9_29_2 -5",
            "-5 - EST 2000_10_5_0 -5",
            "-6 - CST 2001_3_1_3 -6",
            "-7 Canada M%sT"
        ],
        "America/Campo_Grande": [
            "-3:38:28 - LMT 1914 -3:38:28",
            "-4 Brazil AM%sT"
        ],
        "America/Cancun": [
            "-5:47:4 - LMT 1922_0_1_0_12_56 -5:47:4",
            "-6 - CST 1981_11_23 -6",
            "-5 Mexico E%sT 1998_7_2_2 -4",
            "-6 Mexico C%sT"
        ],
        "America/Caracas": [
            "-4:27:44 - LMT 1890 -4:27:44",
            "-4:27:40 - CMT 1912_1_12 -4:27:40",
            "-4:30 - VET 1965 -4:30",
            "-4 - VET 2007_11_9_03 -4",
            "-4:30 - VET"
        ],
        "America/Cayenne": [
            "-3:29:20 - LMT 1911_6 -3:29:20",
            "-4 - GFT 1967_9 -4",
            "-3 - GFT"
        ],
        "America/Cayman": [
            "-5:25:32 - LMT 1890 -5:25:32",
            "-5:7:12 - KMT 1912_1 -5:7:12",
            "-5 - EST"
        ],
        "America/Chicago": [
            "-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36",
            "-6 US C%sT 1920 -6",
            "-6 Chicago C%sT 1936_2_1_2 -6",
            "-5 - EST 1936_10_15_2 -5",
            "-6 Chicago C%sT 1942 -6",
            "-6 US C%sT 1946 -6",
            "-6 Chicago C%sT 1967 -6",
            "-6 US C%sT"
        ],
        "America/Chihuahua": [
            "-7:4:20 - LMT 1921_11_31_23_55_40 -7:4:20",
            "-7 - MST 1927_5_10_23 -7",
            "-6 - CST 1930_10_15 -6",
            "-7 - MST 1931_4_1_23 -7",
            "-6 - CST 1931_9 -6",
            "-7 - MST 1932_3_1 -7",
            "-6 - CST 1996 -6",
            "-6 Mexico C%sT 1998 -6",
            "-6 - CST 1998_3_5_3 -6",
            "-7 Mexico M%sT"
        ],
        "America/Costa_Rica": [
            "-5:36:13 - LMT 1890 -5:36:13",
            "-5:36:13 - SJMT 1921_0_15 -5:36:13",
            "-6 CR C%sT"
        ],
        "America/Creston": [
            "-7:46:4 - LMT 1884 -7:46:4",
            "-7 - MST 1916_9_1 -7",
            "-8 - PST 1918_5_2 -8",
            "-7 - MST"
        ],
        "America/Cuiaba": [
            "-3:44:20 - LMT 1914 -3:44:20",
            "-4 Brazil AM%sT 2003_8_24 -4",
            "-4 - AMT 2004_9_1 -4",
            "-4 Brazil AM%sT"
        ],
        "America/Curacao": [
            "-4:35:47 - LMT 1912_1_12 -4:35:47",
            "-4:30 - ANT 1965 -4:30",
            "-4 - AST"
        ],
        "America/Danmarkshavn": [
            "-1:14:40 - LMT 1916_6_28 -1:14:40",
            "-3 - WGT 1980_3_6_2 -3",
            "-3 EU WG%sT 1996 -3",
            "0 - GMT"
        ],
        "America/Dawson": [
            "-9:17:40 - LMT 1900_7_20 -9:17:40",
            "-9 NT_YK Y%sT 1973_9_28_0 -9",
            "-8 NT_YK P%sT 1980 -8",
            "-8 Canada P%sT"
        ],
        "America/Dawson_Creek": [
            "-8:0:56 - LMT 1884 -8:0:56",
            "-8 Canada P%sT 1947 -8",
            "-8 Vanc P%sT 1972_7_30_2 -7",
            "-7 - MST"
        ],
        "America/Denver": [
            "-6:59:56 - LMT 1883_10_18_12_0_4 -6:59:56",
            "-7 US M%sT 1920 -7",
            "-7 Denver M%sT 1942 -7",
            "-7 US M%sT 1946 -7",
            "-7 Denver M%sT 1967 -7",
            "-7 US M%sT"
        ],
        "America/Detroit": [
            "-5:32:11 - LMT 1905 -5:32:11",
            "-6 - CST 1915_4_15_2 -6",
            "-5 - EST 1942 -5",
            "-5 US E%sT 1946 -5",
            "-5 Detroit E%sT 1973 -5",
            "-5 US E%sT 1975 -5",
            "-5 - EST 1975_3_27_2 -5",
            "-5 US E%sT"
        ],
        "America/Dominica": [
            "-4:5:36 - LMT 1911_6_1_0_1 -4:5:36",
            "-4 - AST"
        ],
        "America/Edmonton": [
            "-7:33:52 - LMT 1906_8 -7:33:52",
            "-7 Edm M%sT 1987 -7",
            "-7 Canada M%sT"
        ],
        "America/Eirunepe": [
            "-4:39:28 - LMT 1914 -4:39:28",
            "-5 Brazil AC%sT 1988_8_12 -5",
            "-5 - ACT 1993_8_28 -5",
            "-5 Brazil AC%sT 1994_8_22 -5",
            "-5 - ACT 2008_5_24_00 -5",
            "-4 - AMT"
        ],
        "America/El_Salvador": [
            "-5:56:48 - LMT 1921 -5:56:48",
            "-6 Salv C%sT"
        ],
        "America/Fortaleza": [
            "-2:34 - LMT 1914 -2:34",
            "-3 Brazil BR%sT 1990_8_17 -3",
            "-3 - BRT 1999_8_30 -3",
            "-3 Brazil BR%sT 2000_9_22 -2",
            "-3 - BRT 2001_8_13 -3",
            "-3 Brazil BR%sT 2002_9_1 -3",
            "-3 - BRT"
        ],
        "America/Glace_Bay": [
            "-3:59:48 - LMT 1902_5_15 -3:59:48",
            "-4 Canada A%sT 1953 -4",
            "-4 Halifax A%sT 1954 -4",
            "-4 - AST 1972 -4",
            "-4 Halifax A%sT 1974 -4",
            "-4 Canada A%sT"
        ],
        "America/Godthab": [
            "-3:26:56 - LMT 1916_6_28 -3:26:56",
            "-3 - WGT 1980_3_6_2 -3",
            "-3 EU WG%sT"
        ],
        "America/Goose_Bay": [
            "-4:1:40 - LMT 1884 -4:1:40",
            "-3:30:52 - NST 1918 -3:30:52",
            "-3:30:52 Canada N%sT 1919 -3:30:52",
            "-3:30:52 - NST 1935_2_30 -3:30:52",
            "-3:30 - NST 1936 -3:30",
            "-3:30 StJohns N%sT 1942_4_11 -3:30",
            "-3:30 Canada N%sT 1946 -3:30",
            "-3:30 StJohns N%sT 1966_2_15_2 -3:30",
            "-4 StJohns A%sT 2011_10 -3",
            "-4 Canada A%sT"
        ],
        "America/Grand_Turk": [
            "-4:44:32 - LMT 1890 -4:44:32",
            "-5:7:12 - KMT 1912_1 -5:7:12",
            "-5 TC E%sT"
        ],
        "America/Grenada": [
            "-4:7 - LMT 1911_6 -4:7",
            "-4 - AST"
        ],
        "America/Guadeloupe": [
            "-4:6:8 - LMT 1911_5_8 -4:6:8",
            "-4 - AST"
        ],
        "America/Guatemala": [
            "-6:2:4 - LMT 1918_9_5 -6:2:4",
            "-6 Guat C%sT"
        ],
        "America/Guayaquil": [
            "-5:19:20 - LMT 1890 -5:19:20",
            "-5:14 - QMT 1931 -5:14",
            "-5 - ECT"
        ],
        "America/Guyana": [
            "-3:52:40 - LMT 1915_2 -3:52:40",
            "-3:45 - GBGT 1966_4_26 -3:45",
            "-3:45 - GYT 1975_6_31 -3:45",
            "-3 - GYT 1991 -3",
            "-4 - GYT"
        ],
        "America/Halifax": [
            "-4:14:24 - LMT 1902_5_15 -4:14:24",
            "-4 Halifax A%sT 1918 -4",
            "-4 Canada A%sT 1919 -4",
            "-4 Halifax A%sT 1942_1_9_2 -4",
            "-4 Canada A%sT 1946 -4",
            "-4 Halifax A%sT 1974 -4",
            "-4 Canada A%sT"
        ],
        "America/Havana": [
            "-5:29:28 - LMT 1890 -5:29:28",
            "-5:29:36 - HMT 1925_6_19_12 -5:29:36",
            "-5 Cuba C%sT"
        ],
        "America/Hermosillo": [
            "-7:23:52 - LMT 1921_11_31_23_36_8 -7:23:52",
            "-7 - MST 1927_5_10_23 -7",
            "-6 - CST 1930_10_15 -6",
            "-7 - MST 1931_4_1_23 -7",
            "-6 - CST 1931_9 -6",
            "-7 - MST 1932_3_1 -7",
            "-6 - CST 1942_3_24 -6",
            "-7 - MST 1949_0_14 -7",
            "-8 - PST 1970 -8",
            "-7 Mexico M%sT 1999 -7",
            "-7 - MST"
        ],
        "America/Indiana/Indianapolis": [
            "-5:44:38 - LMT 1883_10_18_12_15_22 -5:44:38",
            "-6 US C%sT 1920 -6",
            "-6 Indianapolis C%sT 1942 -6",
            "-6 US C%sT 1946 -6",
            "-6 Indianapolis C%sT 1955_3_24_2 -6",
            "-5 - EST 1957_8_29_2 -5",
            "-6 - CST 1958_3_27_2 -6",
            "-5 - EST 1969 -5",
            "-5 US E%sT 1971 -5",
            "-5 - EST 2006 -5",
            "-5 US E%sT"
        ],
        "America/Indiana/Knox": [
            "-5:46:30 - LMT 1883_10_18_12_13_30 -5:46:30",
            "-6 US C%sT 1947 -6",
            "-6 Starke C%sT 1962_3_29_2 -6",
            "-5 - EST 1963_9_27_2 -5",
            "-6 US C%sT 1991_9_27_2 -5",
            "-5 - EST 2006_3_2_2 -5",
            "-6 US C%sT"
        ],
        "America/Indiana/Marengo": [
            "-5:45:23 - LMT 1883_10_18_12_14_37 -5:45:23",
            "-6 US C%sT 1951 -6",
            "-6 Marengo C%sT 1961_3_30_2 -6",
            "-5 - EST 1969 -5",
            "-5 US E%sT 1974_0_6_2 -5",
            "-5 - CDT 1974_9_27_2 -5",
            "-5 US E%sT 1976 -5",
            "-5 - EST 2006 -5",
            "-5 US E%sT"
        ],
        "America/Indiana/Petersburg": [
            "-5:49:7 - LMT 1883_10_18_12_10_53 -5:49:7",
            "-6 US C%sT 1955 -6",
            "-6 Pike C%sT 1965_3_25_2 -6",
            "-5 - EST 1966_9_30_2 -5",
            "-6 US C%sT 1977_9_30_2 -5",
            "-5 - EST 2006_3_2_2 -5",
            "-6 US C%sT 2007_10_4_2 -5",
            "-5 US E%sT"
        ],
        "America/Indiana/Tell_City": [
            "-5:47:3 - LMT 1883_10_18_12_12_57 -5:47:3",
            "-6 US C%sT 1946 -6",
            "-6 Perry C%sT 1964_3_26_2 -6",
            "-5 - EST 1969 -5",
            "-5 US E%sT 1971 -5",
            "-5 - EST 2006_3_2_2 -5",
            "-6 US C%sT"
        ],
        "America/Indiana/Vevay": [
            "-5:40:16 - LMT 1883_10_18_12_19_44 -5:40:16",
            "-6 US C%sT 1954_3_25_2 -6",
            "-5 - EST 1969 -5",
            "-5 US E%sT 1973 -5",
            "-5 - EST 2006 -5",
            "-5 US E%sT"
        ],
        "America/Indiana/Vincennes": [
            "-5:50:7 - LMT 1883_10_18_12_9_53 -5:50:7",
            "-6 US C%sT 1946 -6",
            "-6 Vincennes C%sT 1964_3_26_2 -6",
            "-5 - EST 1969 -5",
            "-5 US E%sT 1971 -5",
            "-5 - EST 2006_3_2_2 -5",
            "-6 US C%sT 2007_10_4_2 -5",
            "-5 US E%sT"
        ],
        "America/Indiana/Winamac": [
            "-5:46:25 - LMT 1883_10_18_12_13_35 -5:46:25",
            "-6 US C%sT 1946 -6",
            "-6 Pulaski C%sT 1961_3_30_2 -6",
            "-5 - EST 1969 -5",
            "-5 US E%sT 1971 -5",
            "-5 - EST 2006_3_2_2 -5",
            "-6 US C%sT 2007_2_11_2 -6",
            "-5 US E%sT"
        ],
        "America/Inuvik": [
            "0 - zzz 1953",
            "-8 NT_YK P%sT 1979_3_29_2 -8",
            "-7 NT_YK M%sT 1980 -7",
            "-7 Canada M%sT"
        ],
        "America/Iqaluit": [
            "0 - zzz 1942_7",
            "-5 NT_YK E%sT 1999_9_31_2 -4",
            "-6 Canada C%sT 2000_9_29_2 -5",
            "-5 Canada E%sT"
        ],
        "America/Jamaica": [
            "-5:7:12 - LMT 1890 -5:7:12",
            "-5:7:12 - KMT 1912_1 -5:7:12",
            "-5 - EST 1974_3_28_2 -5",
            "-5 US E%sT 1984 -5",
            "-5 - EST"
        ],
        "America/Juneau": [
            "15:2:19 - LMT 1867_9_18 15:2:19",
            "-8:57:41 - LMT 1900_7_20_12 -8:57:41",
            "-8 - PST 1942 -8",
            "-8 US P%sT 1946 -8",
            "-8 - PST 1969 -8",
            "-8 US P%sT 1980_3_27_2 -8",
            "-9 US Y%sT 1980_9_26_2 -8",
            "-8 US P%sT 1983_9_30_2 -7",
            "-9 US Y%sT 1983_10_30 -9",
            "-9 US AK%sT"
        ],
        "America/Kentucky/Louisville": [
            "-5:43:2 - LMT 1883_10_18_12_16_58 -5:43:2",
            "-6 US C%sT 1921 -6",
            "-6 Louisville C%sT 1942 -6",
            "-6 US C%sT 1946 -6",
            "-6 Louisville C%sT 1961_6_23_2 -5",
            "-5 - EST 1968 -5",
            "-5 US E%sT 1974_0_6_2 -5",
            "-5 - CDT 1974_9_27_2 -5",
            "-5 US E%sT"
        ],
        "America/Kentucky/Monticello": [
            "-5:39:24 - LMT 1883_10_18_12_20_36 -5:39:24",
            "-6 US C%sT 1946 -6",
            "-6 - CST 1968 -6",
            "-6 US C%sT 2000_9_29_2 -5",
            "-5 US E%sT"
        ],
        "America/La_Paz": [
            "-4:32:36 - LMT 1890 -4:32:36",
            "-4:32:36 - CMT 1931_9_15 -4:32:36",
            "-3:32:36 - BOST 1932_2_21 -3:32:36",
            "-4 - BOT"
        ],
        "America/Lima": [
            "-5:8:12 - LMT 1890 -5:8:12",
            "-5:8:36 - LMT 1908_6_28 -5:8:36",
            "-5 Peru PE%sT"
        ],
        "America/Los_Angeles": [
            "-7:52:58 - LMT 1883_10_18_12_7_2 -7:52:58",
            "-8 US P%sT 1946 -8",
            "-8 CA P%sT 1967 -8",
            "-8 US P%sT"
        ],
        "America/Maceio": [
            "-2:22:52 - LMT 1914 -2:22:52",
            "-3 Brazil BR%sT 1990_8_17 -3",
            "-3 - BRT 1995_9_13 -3",
            "-3 Brazil BR%sT 1996_8_4 -3",
            "-3 - BRT 1999_8_30 -3",
            "-3 Brazil BR%sT 2000_9_22 -2",
            "-3 - BRT 2001_8_13 -3",
            "-3 Brazil BR%sT 2002_9_1 -3",
            "-3 - BRT"
        ],
        "America/Managua": [
            "-5:45:8 - LMT 1890 -5:45:8",
            "-5:45:12 - MMT 1934_5_23 -5:45:12",
            "-6 - CST 1973_4 -6",
            "-5 - EST 1975_1_16 -5",
            "-6 Nic C%sT 1992_0_1_4 -6",
            "-5 - EST 1992_8_24 -5",
            "-6 - CST 1993 -6",
            "-5 - EST 1997 -5",
            "-6 Nic C%sT"
        ],
        "America/Manaus": [
            "-4:0:4 - LMT 1914 -4:0:4",
            "-4 Brazil AM%sT 1988_8_12 -4",
            "-4 - AMT 1993_8_28 -4",
            "-4 Brazil AM%sT 1994_8_22 -4",
            "-4 - AMT"
        ],
        "America/Martinique": [
            "-4:4:20 - LMT 1890 -4:4:20",
            "-4:4:20 - FFMT 1911_4 -4:4:20",
            "-4 - AST 1980_3_6 -4",
            "-3 - ADT 1980_8_28 -3",
            "-4 - AST"
        ],
        "America/Matamoros": [
            "-6:40 - LMT 1921_11_31_23_20 -6:40",
            "-6 - CST 1988 -6",
            "-6 US C%sT 1989 -6",
            "-6 Mexico C%sT 2010 -6",
            "-6 US C%sT"
        ],
        "America/Mazatlan": [
            "-7:5:40 - LMT 1921_11_31_23_54_20 -7:5:40",
            "-7 - MST 1927_5_10_23 -7",
            "-6 - CST 1930_10_15 -6",
            "-7 - MST 1931_4_1_23 -7",
            "-6 - CST 1931_9 -6",
            "-7 - MST 1932_3_1 -7",
            "-6 - CST 1942_3_24 -6",
            "-7 - MST 1949_0_14 -7",
            "-8 - PST 1970 -8",
            "-7 Mexico M%sT"
        ],
        "America/Menominee": [
            "-5:50:27 - LMT 1885_8_18_12 -5:50:27",
            "-6 US C%sT 1946 -6",
            "-6 Menominee C%sT 1969_3_27_2 -6",
            "-5 - EST 1973_3_29_2 -5",
            "-6 US C%sT"
        ],
        "America/Merida": [
            "-5:58:28 - LMT 1922_0_1_0_1_32 -5:58:28",
            "-6 - CST 1981_11_23 -6",
            "-5 - EST 1982_11_2 -5",
            "-6 Mexico C%sT"
        ],
        "America/Metlakatla": [
            "15:13:42 - LMT 1867_9_18 15:13:42",
            "-8:46:18 - LMT 1900_7_20_12 -8:46:18",
            "-8 - PST 1942 -8",
            "-8 US P%sT 1946 -8",
            "-8 - PST 1969 -8",
            "-8 US P%sT 1983_9_30_2 -7",
            "-8 - MeST"
        ],
        "America/Mexico_City": [
            "-6:36:36 - LMT 1922_0_1_0_23_24 -6:36:36",
            "-7 - MST 1927_5_10_23 -7",
            "-6 - CST 1930_10_15 -6",
            "-7 - MST 1931_4_1_23 -7",
            "-6 - CST 1931_9 -6",
            "-7 - MST 1932_3_1 -7",
            "-6 Mexico C%sT 2001_8_30_02 -5",
            "-6 - CST 2002_1_20 -6",
            "-6 Mexico C%sT"
        ],
        "America/Miquelon": [
            "-3:44:40 - LMT 1911_4_15 -3:44:40",
            "-4 - AST 1980_4 -4",
            "-3 - PMST 1987 -3",
            "-3 Canada PM%sT"
        ],
        "America/Moncton": [
            "-4:19:8 - LMT 1883_11_9 -4:19:8",
            "-5 - EST 1902_5_15 -5",
            "-4 Canada A%sT 1933 -4",
            "-4 Moncton A%sT 1942 -4",
            "-4 Canada A%sT 1946 -4",
            "-4 Moncton A%sT 1973 -4",
            "-4 Canada A%sT 1993 -4",
            "-4 Moncton A%sT 2007 -4",
            "-4 Canada A%sT"
        ],
        "America/Monterrey": [
            "-6:41:16 - LMT 1921_11_31_23_18_44 -6:41:16",
            "-6 - CST 1988 -6",
            "-6 US C%sT 1989 -6",
            "-6 Mexico C%sT"
        ],
        "America/Montevideo": [
            "-3:44:44 - LMT 1898_5_28 -3:44:44",
            "-3:44:44 - MMT 1920_4_1 -3:44:44",
            "-3:30 Uruguay UY%sT 1942_11_14 -3:30",
            "-3 Uruguay UY%sT"
        ],
        "America/Montreal": [
            "-4:54:16 - LMT 1884 -4:54:16",
            "-5 Mont E%sT 1918 -5",
            "-5 Canada E%sT 1919 -5",
            "-5 Mont E%sT 1942_1_9_2 -5",
            "-5 Canada E%sT 1946 -5",
            "-5 Mont E%sT 1974 -5",
            "-5 Canada E%sT"
        ],
        "America/Montserrat": [
            "-4:8:52 - LMT 1911_6_1_0_1 -4:8:52",
            "-4 - AST"
        ],
        "America/Nassau": [
            "-5:9:30 - LMT 1912_2_2 -5:9:30",
            "-5 Bahamas E%sT 1976 -5",
            "-5 US E%sT"
        ],
        "America/New_York": [
            "-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2",
            "-5 US E%sT 1920 -5",
            "-5 NYC E%sT 1942 -5",
            "-5 US E%sT 1946 -5",
            "-5 NYC E%sT 1967 -5",
            "-5 US E%sT"
        ],
        "America/Nipigon": [
            "-5:53:4 - LMT 1895 -5:53:4",
            "-5 Canada E%sT 1940_8_29 -5",
            "-4 - EDT 1942_1_9_2 -5",
            "-5 Canada E%sT"
        ],
        "America/Nome": [
            "12:58:21 - LMT 1867_9_18 12:58:21",
            "-11:1:38 - LMT 1900_7_20_12 -11:1:38",
            "-11 - NST 1942 -11",
            "-11 US N%sT 1946 -11",
            "-11 - NST 1967_3 -11",
            "-11 - BST 1969 -11",
            "-11 US B%sT 1983_9_30_2 -10",
            "-9 US Y%sT 1983_10_30 -9",
            "-9 US AK%sT"
        ],
        "America/Noronha": [
            "-2:9:40 - LMT 1914 -2:9:40",
            "-2 Brazil FN%sT 1990_8_17 -2",
            "-2 - FNT 1999_8_30 -2",
            "-2 Brazil FN%sT 2000_9_15 -1",
            "-2 - FNT 2001_8_13 -2",
            "-2 Brazil FN%sT 2002_9_1 -2",
            "-2 - FNT"
        ],
        "America/North_Dakota/Beulah": [
            "-6:47:7 - LMT 1883_10_18_12_12_53 -6:47:7",
            "-7 US M%sT 2010_10_7_2 -6",
            "-6 US C%sT"
        ],
        "America/North_Dakota/Center": [
            "-6:45:12 - LMT 1883_10_18_12_14_48 -6:45:12",
            "-7 US M%sT 1992_9_25_02 -6",
            "-6 US C%sT"
        ],
        "America/North_Dakota/New_Salem": [
            "-6:45:39 - LMT 1883_10_18_12_14_21 -6:45:39",
            "-7 US M%sT 2003_9_26_02 -6",
            "-6 US C%sT"
        ],
        "America/Ojinaga": [
            "-6:57:40 - LMT 1922_0_1_0_2_20 -6:57:40",
            "-7 - MST 1927_5_10_23 -7",
            "-6 - CST 1930_10_15 -6",
            "-7 - MST 1931_4_1_23 -7",
            "-6 - CST 1931_9 -6",
            "-7 - MST 1932_3_1 -7",
            "-6 - CST 1996 -6",
            "-6 Mexico C%sT 1998 -6",
            "-6 - CST 1998_3_5_3 -6",
            "-7 Mexico M%sT 2010 -7",
            "-7 US M%sT"
        ],
        "America/Panama": [
            "-5:18:8 - LMT 1890 -5:18:8",
            "-5:19:36 - CMT 1908_3_22 -5:19:36",
            "-5 - EST"
        ],
        "America/Pangnirtung": [
            "0 - zzz 1921",
            "-4 NT_YK A%sT 1995_3_2_2 -4",
            "-5 Canada E%sT 1999_9_31_2 -4",
            "-6 Canada C%sT 2000_9_29_2 -5",
            "-5 Canada E%sT"
        ],
        "America/Paramaribo": [
            "-3:40:40 - LMT 1911 -3:40:40",
            "-3:40:52 - PMT 1935 -3:40:52",
            "-3:40:36 - PMT 1945_9 -3:40:36",
            "-3:30 - NEGT 1975_10_20 -3:30",
            "-3:30 - SRT 1984_9 -3:30",
            "-3 - SRT"
        ],
        "America/Phoenix": [
            "-7:28:18 - LMT 1883_10_18_11_31_42 -7:28:18",
            "-7 US M%sT 1944_0_1_00_1 -6",
            "-7 - MST 1944_3_1_00_1 -7",
            "-7 US M%sT 1944_9_1_00_1 -6",
            "-7 - MST 1967 -7",
            "-7 US M%sT 1968_2_21 -7",
            "-7 - MST"
        ],
        "America/Port-au-Prince": [
            "-4:49:20 - LMT 1890 -4:49:20",
            "-4:49 - PPMT 1917_0_24_12 -4:49",
            "-5 Haiti E%sT"
        ],
        "America/Port_of_Spain": [
            "-4:6:4 - LMT 1912_2_2 -4:6:4",
            "-4 - AST"
        ],
        "America/Porto_Velho": [
            "-4:15:36 - LMT 1914 -4:15:36",
            "-4 Brazil AM%sT 1988_8_12 -4",
            "-4 - AMT"
        ],
        "America/Puerto_Rico": [
            "-4:24:25 - LMT 1899_2_28_12 -4:24:25",
            "-4 - AST 1942_4_3 -4",
            "-4 US A%sT 1946 -4",
            "-4 - AST"
        ],
        "America/Rainy_River": [
            "-6:18:16 - LMT 1895 -6:18:16",
            "-6 Canada C%sT 1940_8_29 -6",
            "-5 - CDT 1942_1_9_2 -6",
            "-6 Canada C%sT"
        ],
        "America/Rankin_Inlet": [
            "0 - zzz 1957",
            "-6 NT_YK C%sT 2000_9_29_2 -5",
            "-5 - EST 2001_3_1_3 -5",
            "-6 Canada C%sT"
        ],
        "America/Recife": [
            "-2:19:36 - LMT 1914 -2:19:36",
            "-3 Brazil BR%sT 1990_8_17 -3",
            "-3 - BRT 1999_8_30 -3",
            "-3 Brazil BR%sT 2000_9_15 -2",
            "-3 - BRT 2001_8_13 -3",
            "-3 Brazil BR%sT 2002_9_1 -3",
            "-3 - BRT"
        ],
        "America/Regina": [
            "-6:58:36 - LMT 1905_8 -6:58:36",
            "-7 Regina M%sT 1960_3_24_2 -7",
            "-6 - CST"
        ],
        "America/Resolute": [
            "0 - zzz 1947_7_31",
            "-6 NT_YK C%sT 2000_9_29_2 -5",
            "-5 - EST 2001_3_1_3 -5",
            "-6 Canada C%sT 2006_9_29_2 -5",
            "-5 - EST 2007_2_11_3 -5",
            "-6 Canada C%sT"
        ],
        "America/Rio_Branco": [
            "-4:31:12 - LMT 1914 -4:31:12",
            "-5 Brazil AC%sT 1988_8_12 -5",
            "-5 - ACT 2008_5_24_00 -5",
            "-4 - AMT"
        ],
        "America/Santa_Isabel": [
            "-7:39:28 - LMT 1922_0_1_0_20_32 -7:39:28",
            "-7 - MST 1924 -7",
            "-8 - PST 1927_5_10_23 -8",
            "-7 - MST 1930_10_15 -7",
            "-8 - PST 1931_3_1 -8",
            "-7 - PDT 1931_8_30 -7",
            "-8 - PST 1942_3_24 -8",
            "-7 - PWT 1945_7_14_23",
            "-7 - PPT 1945_10_12 -7",
            "-8 - PST 1948_3_5 -8",
            "-7 - PDT 1949_0_14 -7",
            "-8 - PST 1954 -8",
            "-8 CA P%sT 1961 -8",
            "-8 - PST 1976 -8",
            "-8 US P%sT 1996 -8",
            "-8 Mexico P%sT 2001 -8",
            "-8 US P%sT 2002_1_20 -8",
            "-8 Mexico P%sT"
        ],
        "America/Santarem": [
            "-3:38:48 - LMT 1914 -3:38:48",
            "-4 Brazil AM%sT 1988_8_12 -4",
            "-4 - AMT 2008_5_24_00 -4",
            "-3 - BRT"
        ],
        "America/Santiago": [
            "-4:42:46 - LMT 1890 -4:42:46",
            "-4:42:46 - SMT 1910 -4:42:46",
            "-5 - CLT 1916_6_1 -5",
            "-4:42:46 - SMT 1918_8_1 -4:42:46",
            "-4 - CLT 1919_6_1 -4",
            "-4:42:46 - SMT 1927_8_1 -4:42:46",
            "-5 Chile CL%sT 1947_4_22 -5",
            "-4 Chile CL%sT"
        ],
        "America/Santo_Domingo": [
            "-4:39:36 - LMT 1890 -4:39:36",
            "-4:40 - SDMT 1933_3_1_12 -4:40",
            "-5 DR E%sT 1974_9_27 -5",
            "-4 - AST 2000_9_29_02 -4",
            "-5 US E%sT 2000_11_3_01 -5",
            "-4 - AST"
        ],
        "America/Sao_Paulo": [
            "-3:6:28 - LMT 1914 -3:6:28",
            "-3 Brazil BR%sT 1963_9_23_00 -3",
            "-2 - BRST 1964 -2",
            "-3 Brazil BR%sT"
        ],
        "America/Scoresbysund": [
            "-1:27:52 - LMT 1916_6_28 -1:27:52",
            "-2 - CGT 1980_3_6_2 -2",
            "-2 C-Eur CG%sT 1981_2_29 -2",
            "-1 EU EG%sT"
        ],
        "America/Sitka": [
            "14:58:47 - LMT 1867_9_18 14:58:47",
            "-9:1:13 - LMT 1900_7_20_12 -9:1:13",
            "-8 - PST 1942 -8",
            "-8 US P%sT 1946 -8",
            "-8 - PST 1969 -8",
            "-8 US P%sT 1983_9_30_2 -7",
            "-9 US Y%sT 1983_10_30 -9",
            "-9 US AK%sT"
        ],
        "America/St_Johns": [
            "-3:30:52 - LMT 1884 -3:30:52",
            "-3:30:52 StJohns N%sT 1918 -3:30:52",
            "-3:30:52 Canada N%sT 1919 -3:30:52",
            "-3:30:52 StJohns N%sT 1935_2_30 -3:30:52",
            "-3:30 StJohns N%sT 1942_4_11 -3:30",
            "-3:30 Canada N%sT 1946 -3:30",
            "-3:30 StJohns N%sT 2011_10 -2:30",
            "-3:30 Canada N%sT"
        ],
        "America/St_Kitts": [
            "-4:10:52 - LMT 1912_2_2 -4:10:52",
            "-4 - AST"
        ],
        "America/St_Lucia": [
            "-4:4 - LMT 1890 -4:4",
            "-4:4 - CMT 1912 -4:4",
            "-4 - AST"
        ],
        "America/St_Thomas": [
            "-4:19:44 - LMT 1911_6 -4:19:44",
            "-4 - AST"
        ],
        "America/St_Vincent": [
            "-4:4:56 - LMT 1890 -4:4:56",
            "-4:4:56 - KMT 1912 -4:4:56",
            "-4 - AST"
        ],
        "America/Swift_Current": [
            "-7:11:20 - LMT 1905_8 -7:11:20",
            "-7 Canada M%sT 1946_3_28_2 -7",
            "-7 Regina M%sT 1950 -7",
            "-7 Swift M%sT 1972_3_30_2 -7",
            "-6 - CST"
        ],
        "America/Tegucigalpa": [
            "-5:48:52 - LMT 1921_3 -5:48:52",
            "-6 Hond C%sT"
        ],
        "America/Thule": [
            "-4:35:8 - LMT 1916_6_28 -4:35:8",
            "-4 Thule A%sT"
        ],
        "America/Thunder_Bay": [
            "-5:57 - LMT 1895 -5:57",
            "-6 - CST 1910 -6",
            "-5 - EST 1942 -5",
            "-5 Canada E%sT 1970 -5",
            "-5 Mont E%sT 1973 -5",
            "-5 - EST 1974 -5",
            "-5 Canada E%sT"
        ],
        "America/Tijuana": [
            "-7:48:4 - LMT 1922_0_1_0_11_56 -7:48:4",
            "-7 - MST 1924 -7",
            "-8 - PST 1927_5_10_23 -8",
            "-7 - MST 1930_10_15 -7",
            "-8 - PST 1931_3_1 -8",
            "-7 - PDT 1931_8_30 -7",
            "-8 - PST 1942_3_24 -8",
            "-7 - PWT 1945_7_14_23",
            "-7 - PPT 1945_10_12 -7",
            "-8 - PST 1948_3_5 -8",
            "-7 - PDT 1949_0_14 -7",
            "-8 - PST 1954 -8",
            "-8 CA P%sT 1961 -8",
            "-8 - PST 1976 -8",
            "-8 US P%sT 1996 -8",
            "-8 Mexico P%sT 2001 -8",
            "-8 US P%sT 2002_1_20 -8",
            "-8 Mexico P%sT 2010 -8",
            "-8 US P%sT"
        ],
        "America/Toronto": [
            "-5:17:32 - LMT 1895 -5:17:32",
            "-5 Canada E%sT 1919 -5",
            "-5 Toronto E%sT 1942_1_9_2 -5",
            "-5 Canada E%sT 1946 -5",
            "-5 Toronto E%sT 1974 -5",
            "-5 Canada E%sT"
        ],
        "America/Tortola": [
            "-4:18:28 - LMT 1911_6 -4:18:28",
            "-4 - AST"
        ],
        "America/Vancouver": [
            "-8:12:28 - LMT 1884 -8:12:28",
            "-8 Vanc P%sT 1987 -8",
            "-8 Canada P%sT"
        ],
        "America/Whitehorse": [
            "-9:0:12 - LMT 1900_7_20 -9:0:12",
            "-9 NT_YK Y%sT 1966_6_1_2 -9",
            "-8 NT_YK P%sT 1980 -8",
            "-8 Canada P%sT"
        ],
        "America/Winnipeg": [
            "-6:28:36 - LMT 1887_6_16 -6:28:36",
            "-6 Winn C%sT 2006 -6",
            "-6 Canada C%sT"
        ],
        "America/Yakutat": [
            "14:41:5 - LMT 1867_9_18 14:41:5",
            "-9:18:55 - LMT 1900_7_20_12 -9:18:55",
            "-9 - YST 1942 -9",
            "-9 US Y%sT 1946 -9",
            "-9 - YST 1969 -9",
            "-9 US Y%sT 1983_10_30 -9",
            "-9 US AK%sT"
        ],
        "America/Yellowknife": [
            "0 - zzz 1935",
            "-7 NT_YK M%sT 1980 -7",
            "-7 Canada M%sT"
        ],
        "Asia/Aden": [
            "2:59:54 - LMT 1950 2:59:54",
            "3 - AST"
        ],
        "Asia/Almaty": [
            "5:7:48 - LMT 1924_4_2 5:7:48",
            "5 - ALMT 1930_5_21 5",
            "6 RussiaAsia ALM%sT 1991 6",
            "6 - ALMT 1992 6",
            "6 RussiaAsia ALM%sT 2005_2_15 6",
            "6 - ALMT"
        ],
        "Asia/Amman": [
            "2:23:44 - LMT 1931 2:23:44",
            "2 Jordan EE%sT"
        ],
        "Asia/Anadyr": [
            "11:49:56 - LMT 1924_4_2 11:49:56",
            "12 - ANAT 1930_5_21 12",
            "13 Russia ANA%sT 1982_3_1_0 13",
            "12 Russia ANA%sT 1991_2_31_2 12",
            "11 Russia ANA%sT 1992_0_19_2 11",
            "12 Russia ANA%sT 2010_2_28_2 12",
            "11 Russia ANA%sT 2011_2_27_2 11",
            "12 - ANAT"
        ],
        "Asia/Aqtau": [
            "3:21:4 - LMT 1924_4_2 3:21:4",
            "4 - FORT 1930_5_21 4",
            "5 - FORT 1963 5",
            "5 - SHET 1981_9_1 5",
            "6 - SHET 1982_3_1 6",
            "5 RussiaAsia SHE%sT 1991 5",
            "5 - SHET 1991_11_16 5",
            "5 RussiaAsia AQT%sT 1995_2_26_2 5",
            "4 RussiaAsia AQT%sT 2005_2_15 4",
            "5 - AQTT"
        ],
        "Asia/Aqtobe": [
            "3:48:40 - LMT 1924_4_2 3:48:40",
            "4 - AKTT 1930_5_21 4",
            "5 - AKTT 1981_3_1 5",
            "6 - AKTST 1981_9_1 6",
            "6 - AKTT 1982_3_1 6",
            "5 RussiaAsia AKT%sT 1991 5",
            "5 - AKTT 1991_11_16 5",
            "5 RussiaAsia AQT%sT 2005_2_15 5",
            "5 - AQTT"
        ],
        "Asia/Ashgabat": [
            "3:53:32 - LMT 1924_4_2 3:53:32",
            "4 - ASHT 1930_5_21 4",
            "5 RussiaAsia ASH%sT 1991_2_31_2 5",
            "4 RussiaAsia ASH%sT 1991_9_27 4",
            "4 RussiaAsia TM%sT 1992_0_19_2 4",
            "5 - TMT"
        ],
        "Asia/Baghdad": [
            "2:57:40 - LMT 1890 2:57:40",
            "2:57:36 - BMT 1918 2:57:36",
            "3 - AST 1982_4 3",
            "3 Iraq A%sT"
        ],
        "Asia/Bahrain": [
            "3:22:20 - LMT 1920 3:22:20",
            "4 - GST 1972_5 4",
            "3 - AST"
        ],
        "Asia/Baku": [
            "3:19:24 - LMT 1924_4_2 3:19:24",
            "3 - BAKT 1957_2 3",
            "4 RussiaAsia BAK%sT 1991_2_31_2 4",
            "4 - BAKST 1991_7_30 4",
            "3 RussiaAsia AZ%sT 1992_8_26_23 4",
            "4 - AZT 1996 4",
            "4 EUAsia AZ%sT 1997 4",
            "4 Azer AZ%sT"
        ],
        "Asia/Bangkok": [
            "6:42:4 - LMT 1880 6:42:4",
            "6:42:4 - BMT 1920_3 6:42:4",
            "7 - ICT"
        ],
        "Asia/Beirut": [
            "2:22 - LMT 1880 2:22",
            "2 Lebanon EE%sT"
        ],
        "Asia/Bishkek": [
            "4:58:24 - LMT 1924_4_2 4:58:24",
            "5 - FRUT 1930_5_21 5",
            "6 RussiaAsia FRU%sT 1991_2_31_2 6",
            "6 - FRUST 1991_7_31_2 6",
            "5 Kyrgyz KG%sT 2005_7_12 6",
            "6 - KGT"
        ],
        "Asia/Brunei": [
            "7:39:40 - LMT 1926_2 7:39:40",
            "7:30 - BNT 1933 7:30",
            "8 - BNT"
        ],
        "Asia/Choibalsan": [
            "7:38 - LMT 1905_7 7:38",
            "7 - ULAT 1978 7",
            "8 - ULAT 1983_3 8",
            "9 Mongol CHO%sT 2008_2_31 9",
            "8 Mongol CHO%sT"
        ],
        "Asia/Chongqing": [
            "7:6:20 - LMT 1928 7:6:20",
            "7 - LONT 1980_4 7",
            "8 PRC C%sT"
        ],
        "Asia/Colombo": [
            "5:19:24 - LMT 1880 5:19:24",
            "5:19:32 - MMT 1906 5:19:32",
            "5:30 - IST 1942_0_5 5:30",
            "6 - IHST 1942_8 6",
            "6:30 - IST 1945_9_16_2 6:30",
            "5:30 - IST 1996_4_25_0 5:30",
            "6:30 - LKT 1996_9_26_0_30 6:30",
            "6 - LKT 2006_3_15_0_30 6",
            "5:30 - IST"
        ],
        "Asia/Damascus": [
            "2:25:12 - LMT 1920 2:25:12",
            "2 Syria EE%sT"
        ],
        "Asia/Dhaka": [
            "6:1:40 - LMT 1890 6:1:40",
            "5:53:20 - HMT 1941_9 5:53:20",
            "6:30 - BURT 1942_4_15 6:30",
            "5:30 - IST 1942_8 5:30",
            "6:30 - BURT 1951_8_30 6:30",
            "6 - DACT 1971_2_26 6",
            "6 - BDT 2009 6",
            "6 Dhaka BD%sT"
        ],
        "Asia/Dili": [
            "8:22:20 - LMT 1912 8:22:20",
            "8 - TLT 1942_1_21_23 8",
            "9 - JST 1945_8_23 9",
            "9 - TLT 1976_4_3 9",
            "8 - CIT 2000_8_17_00 8",
            "9 - TLT"
        ],
        "Asia/Dubai": [
            "3:41:12 - LMT 1920 3:41:12",
            "4 - GST"
        ],
        "Asia/Dushanbe": [
            "4:35:12 - LMT 1924_4_2 4:35:12",
            "5 - DUST 1930_5_21 5",
            "6 RussiaAsia DUS%sT 1991_2_31_2 6",
            "6 - DUSST 1991_8_9_2 5",
            "5 - TJT"
        ],
        "Asia/Gaza": [
            "2:17:52 - LMT 1900_9 2:17:52",
            "2 Zion EET 1948_4_15 2",
            "2 EgyptAsia EE%sT 1967_5_5 3",
            "2 Zion I%sT 1996 2",
            "2 Jordan EE%sT 1999 2",
            "2 Palestine EE%sT 2008_7_29_0 3",
            "2 - EET 2008_8 2",
            "2 Palestine EE%sT 2010 2",
            "2 - EET 2010_2_27_0_1 2",
            "2 Palestine EE%sT 2011_7_1 3",
            "2 - EET 2012 2",
            "2 Palestine EE%sT"
        ],
        "Asia/Harbin": [
            "8:26:44 - LMT 1928 8:26:44",
            "8:30 - CHAT 1932_2 8:30",
            "8 - CST 1940 8",
            "9 - CHAT 1966_4 9",
            "8:30 - CHAT 1980_4 8:30",
            "8 PRC C%sT"
        ],
        "Asia/Hebron": [
            "2:20:23 - LMT 1900_9 2:20:23",
            "2 Zion EET 1948_4_15 2",
            "2 EgyptAsia EE%sT 1967_5_5 3",
            "2 Zion I%sT 1996 2",
            "2 Jordan EE%sT 1999 2",
            "2 Palestine EE%sT"
        ],
        "Asia/Ho_Chi_Minh": [
            "7:6:40 - LMT 1906_5_9 7:6:40",
            "7:6:20 - SMT 1911_2_11_0_1 7:6:20",
            "7 - ICT 1912_4 7",
            "8 - ICT 1931_4 8",
            "7 - ICT"
        ],
        "Asia/Hong_Kong": [
            "7:36:42 - LMT 1904_9_30 7:36:42",
            "8 HK HK%sT 1941_11_25 8",
            "9 - JST 1945_8_15 9",
            "8 HK HK%sT"
        ],
        "Asia/Hovd": [
            "6:6:36 - LMT 1905_7 6:6:36",
            "6 - HOVT 1978 6",
            "7 Mongol HOV%sT"
        ],
        "Asia/Irkutsk": [
            "6:57:20 - LMT 1880 6:57:20",
            "6:57:20 - IMT 1920_0_25 6:57:20",
            "7 - IRKT 1930_5_21 7",
            "8 Russia IRK%sT 1991_2_31_2 8",
            "7 Russia IRK%sT 1992_0_19_2 7",
            "8 Russia IRK%sT 2011_2_27_2 8",
            "9 - IRKT"
        ],
        "Asia/Jakarta": [
            "7:7:12 - LMT 1867_7_10 7:7:12",
            "7:7:12 - JMT 1923_11_31_23_47_12 7:7:12",
            "7:20 - JAVT 1932_10 7:20",
            "7:30 - WIT 1942_2_23 7:30",
            "9 - JST 1945_8_23 9",
            "7:30 - WIT 1948_4 7:30",
            "8 - WIT 1950_4 8",
            "7:30 - WIT 1964 7:30",
            "7 - WIT"
        ],
        "Asia/Jayapura": [
            "9:22:48 - LMT 1932_10 9:22:48",
            "9 - EIT 1944_8_1 9",
            "9:30 - CST 1964 9:30",
            "9 - EIT"
        ],
        "Asia/Jerusalem": [
            "2:20:56 - LMT 1880 2:20:56",
            "2:20:40 - JMT 1918 2:20:40",
            "2 Zion I%sT"
        ],
        "Asia/Kabul": [
            "4:36:48 - LMT 1890 4:36:48",
            "4 - AFT 1945 4",
            "4:30 - AFT"
        ],
        "Asia/Kamchatka": [
            "10:34:36 - LMT 1922_10_10 10:34:36",
            "11 - PETT 1930_5_21 11",
            "12 Russia PET%sT 1991_2_31_2 12",
            "11 Russia PET%sT 1992_0_19_2 11",
            "12 Russia PET%sT 2010_2_28_2 12",
            "11 Russia PET%sT 2011_2_27_2 11",
            "12 - PETT"
        ],
        "Asia/Karachi": [
            "4:28:12 - LMT 1907 4:28:12",
            "5:30 - IST 1942_8 5:30",
            "6:30 - IST 1945_9_15 6:30",
            "5:30 - IST 1951_8_30 5:30",
            "5 - KART 1971_2_26 5",
            "5 Pakistan PK%sT"
        ],
        "Asia/Kashgar": [
            "5:3:56 - LMT 1928 5:3:56",
            "5:30 - KAST 1940 5:30",
            "5 - KAST 1980_4 5",
            "8 PRC C%sT"
        ],
        "Asia/Kathmandu": [
            "5:41:16 - LMT 1920 5:41:16",
            "5:30 - IST 1986 5:30",
            "5:45 - NPT"
        ],
        "Asia/Khandyga": [
            "9:2:13 - LMT 1919_11_15 9:2:13",
            "8 - YAKT 1930_5_21 8",
            "9 Russia YAK%sT 1991_2_31_2 9",
            "8 Russia YAK%sT 1992_0_19_2 8",
            "9 Russia YAK%sT 2004 9",
            "10 Russia VLA%sT 2011_2_27_2 10",
            "11 - VLAT 2011_8_13_0 11",
            "10 - YAKT"
        ],
        "Asia/Kolkata": [
            "5:53:28 - LMT 1880 5:53:28",
            "5:53:20 - HMT 1941_9 5:53:20",
            "6:30 - BURT 1942_4_15 6:30",
            "5:30 - IST 1942_8 5:30",
            "6:30 - IST 1945_9_15 6:30",
            "5:30 - IST"
        ],
        "Asia/Krasnoyarsk": [
            "6:11:20 - LMT 1920_0_6 6:11:20",
            "6 - KRAT 1930_5_21 6",
            "7 Russia KRA%sT 1991_2_31_2 7",
            "6 Russia KRA%sT 1992_0_19_2 6",
            "7 Russia KRA%sT 2011_2_27_2 7",
            "8 - KRAT"
        ],
        "Asia/Kuala_Lumpur": [
            "6:46:46 - LMT 1901_0_1 6:46:46",
            "6:55:25 - SMT 1905_5_1 6:55:25",
            "7 - MALT 1933_0_1 7",
            "7:20 - MALST 1936_0_1 7:20",
            "7:20 - MALT 1941_8_1 7:20",
            "7:30 - MALT 1942_1_16 7:30",
            "9 - JST 1945_8_12 9",
            "7:30 - MALT 1982_0_1 7:30",
            "8 - MYT"
        ],
        "Asia/Kuching": [
            "7:21:20 - LMT 1926_2 7:21:20",
            "7:30 - BORT 1933 7:30",
            "8 NBorneo BOR%sT 1942_1_16 8",
            "9 - JST 1945_8_12 9",
            "8 - BORT 1982_0_1 8",
            "8 - MYT"
        ],
        "Asia/Kuwait": [
            "3:11:56 - LMT 1950 3:11:56",
            "3 - AST"
        ],
        "Asia/Macau": [
            "7:34:20 - LMT 1912 7:34:20",
            "8 Macau MO%sT 1999_11_20 8",
            "8 PRC C%sT"
        ],
        "Asia/Magadan": [
            "10:3:12 - LMT 1924_4_2 10:3:12",
            "10 - MAGT 1930_5_21 10",
            "11 Russia MAG%sT 1991_2_31_2 11",
            "10 Russia MAG%sT 1992_0_19_2 10",
            "11 Russia MAG%sT 2011_2_27_2 11",
            "12 - MAGT"
        ],
        "Asia/Makassar": [
            "7:57:36 - LMT 1920 7:57:36",
            "7:57:36 - MMT 1932_10 7:57:36",
            "8 - CIT 1942_1_9 8",
            "9 - JST 1945_8_23 9",
            "8 - CIT"
        ],
        "Asia/Manila": [
            "-15:56 - LMT 1844_11_31 -15:56",
            "8:4 - LMT 1899_4_11 8:4",
            "8 Phil PH%sT 1942_4 8",
            "9 - JST 1944_10 9",
            "8 Phil PH%sT"
        ],
        "Asia/Muscat": [
            "3:54:24 - LMT 1920 3:54:24",
            "4 - GST"
        ],
        "Asia/Nicosia": [
            "2:13:28 - LMT 1921_10_14 2:13:28",
            "2 Cyprus EE%sT 1998_8 3",
            "2 EUAsia EE%sT"
        ],
        "Asia/Novokuznetsk": [
            "5:48:48 - NMT 1920_0_6 5:48:48",
            "6 - KRAT 1930_5_21 6",
            "7 Russia KRA%sT 1991_2_31_2 7",
            "6 Russia KRA%sT 1992_0_19_2 6",
            "7 Russia KRA%sT 2010_2_28_2 7",
            "6 Russia NOV%sT 2011_2_27_2 6",
            "7 - NOVT"
        ],
        "Asia/Novosibirsk": [
            "5:31:40 - LMT 1919_11_14_6 5:31:40",
            "6 - NOVT 1930_5_21 6",
            "7 Russia NOV%sT 1991_2_31_2 7",
            "6 Russia NOV%sT 1992_0_19_2 6",
            "7 Russia NOV%sT 1993_4_23 8",
            "6 Russia NOV%sT 2011_2_27_2 6",
            "7 - NOVT"
        ],
        "Asia/Omsk": [
            "4:53:36 - LMT 1919_10_14 4:53:36",
            "5 - OMST 1930_5_21 5",
            "6 Russia OMS%sT 1991_2_31_2 6",
            "5 Russia OMS%sT 1992_0_19_2 5",
            "6 Russia OMS%sT 2011_2_27_2 6",
            "7 - OMST"
        ],
        "Asia/Oral": [
            "3:25:24 - LMT 1924_4_2 3:25:24",
            "4 - URAT 1930_5_21 4",
            "5 - URAT 1981_3_1 5",
            "6 - URAST 1981_9_1 6",
            "6 - URAT 1982_3_1 6",
            "5 RussiaAsia URA%sT 1989_2_26_2 5",
            "4 RussiaAsia URA%sT 1991 4",
            "4 - URAT 1991_11_16 4",
            "4 RussiaAsia ORA%sT 2005_2_15 4",
            "5 - ORAT"
        ],
        "Asia/Phnom_Penh": [
            "6:59:40 - LMT 1906_5_9 6:59:40",
            "7:6:20 - SMT 1911_2_11_0_1 7:6:20",
            "7 - ICT 1912_4 7",
            "8 - ICT 1931_4 8",
            "7 - ICT"
        ],
        "Asia/Pontianak": [
            "7:17:20 - LMT 1908_4 7:17:20",
            "7:17:20 - PMT 1932_10 7:17:20",
            "7:30 - WIT 1942_0_29 7:30",
            "9 - JST 1945_8_23 9",
            "7:30 - WIT 1948_4 7:30",
            "8 - WIT 1950_4 8",
            "7:30 - WIT 1964 7:30",
            "8 - CIT 1988_0_1 8",
            "7 - WIT"
        ],
        "Asia/Pyongyang": [
            "8:23 - LMT 1890 8:23",
            "8:30 - KST 1904_11 8:30",
            "9 - KST 1928 9",
            "8:30 - KST 1932 8:30",
            "9 - KST 1954_2_21 9",
            "8 - KST 1961_7_10 8",
            "9 - KST"
        ],
        "Asia/Qatar": [
            "3:26:8 - LMT 1920 3:26:8",
            "4 - GST 1972_5 4",
            "3 - AST"
        ],
        "Asia/Qyzylorda": [
            "4:21:52 - LMT 1924_4_2 4:21:52",
            "4 - KIZT 1930_5_21 4",
            "5 - KIZT 1981_3_1 5",
            "6 - KIZST 1981_9_1 6",
            "6 - KIZT 1982_3_1 6",
            "5 RussiaAsia KIZ%sT 1991 5",
            "5 - KIZT 1991_11_16 5",
            "5 - QYZT 1992_0_19_2 5",
            "6 RussiaAsia QYZ%sT 2005_2_15 6",
            "6 - QYZT"
        ],
        "Asia/Rangoon": [
            "6:24:40 - LMT 1880 6:24:40",
            "6:24:40 - RMT 1920 6:24:40",
            "6:30 - BURT 1942_4 6:30",
            "9 - JST 1945_4_3 9",
            "6:30 - MMT"
        ],
        "Asia/Riyadh": [
            "3:6:52 - LMT 1950 3:6:52",
            "3 - AST"
        ],
        "Asia/Sakhalin": [
            "9:30:48 - LMT 1905_7_23 9:30:48",
            "9 - CJT 1938 9",
            "9 - JST 1945_7_25 9",
            "11 Russia SAK%sT 1991_2_31_2 11",
            "10 Russia SAK%sT 1992_0_19_2 10",
            "11 Russia SAK%sT 1997_2_30_2 11",
            "10 Russia SAK%sT 2011_2_27_2 10",
            "11 - SAKT"
        ],
        "Asia/Samarkand": [
            "4:27:12 - LMT 1924_4_2 4:27:12",
            "4 - SAMT 1930_5_21 4",
            "5 - SAMT 1981_3_1 5",
            "6 - SAMST 1981_9_1 6",
            "6 - TAST 1982_3_1 6",
            "5 RussiaAsia SAM%sT 1991_8_1 6",
            "5 RussiaAsia UZ%sT 1992 5",
            "5 - UZT"
        ],
        "Asia/Seoul": [
            "8:27:52 - LMT 1890 8:27:52",
            "8:30 - KST 1904_11 8:30",
            "9 - KST 1928 9",
            "8:30 - KST 1932 8:30",
            "9 - KST 1954_2_21 9",
            "8 ROK K%sT 1961_7_10 8",
            "8:30 - KST 1968_9 8:30",
            "9 ROK K%sT"
        ],
        "Asia/Shanghai": [
            "8:5:57 - LMT 1928 8:5:57",
            "8 Shang C%sT 1949 8",
            "8 PRC C%sT"
        ],
        "Asia/Singapore": [
            "6:55:25 - LMT 1901_0_1 6:55:25",
            "6:55:25 - SMT 1905_5_1 6:55:25",
            "7 - MALT 1933_0_1 7",
            "7:20 - MALST 1936_0_1 7:20",
            "7:20 - MALT 1941_8_1 7:20",
            "7:30 - MALT 1942_1_16 7:30",
            "9 - JST 1945_8_12 9",
            "7:30 - MALT 1965_7_9 7:30",
            "7:30 - SGT 1982_0_1 7:30",
            "8 - SGT"
        ],
        "Asia/Taipei": [
            "8:6 - LMT 1896 8:6",
            "8 Taiwan C%sT"
        ],
        "Asia/Tashkent": [
            "4:37:12 - LMT 1924_4_2 4:37:12",
            "5 - TAST 1930_5_21 5",
            "6 RussiaAsia TAS%sT 1991_2_31_2 6",
            "5 RussiaAsia TAS%sT 1991_8_1 6",
            "5 RussiaAsia UZ%sT 1992 5",
            "5 - UZT"
        ],
        "Asia/Tbilisi": [
            "2:59:16 - LMT 1880 2:59:16",
            "2:59:16 - TBMT 1924_4_2 2:59:16",
            "3 - TBIT 1957_2 3",
            "4 RussiaAsia TBI%sT 1991_2_31_2 4",
            "4 - TBIST 1991_3_9 4",
            "3 RussiaAsia GE%sT 1992 3",
            "3 E-EurAsia GE%sT 1994_8_25 4",
            "4 E-EurAsia GE%sT 1996_9_27 5",
            "5 - GEST 1997_2_30 5",
            "4 E-EurAsia GE%sT 2004_5_27 5",
            "3 RussiaAsia GE%sT 2005_2_27_2 3",
            "4 - GET"
        ],
        "Asia/Tehran": [
            "3:25:44 - LMT 1916 3:25:44",
            "3:25:44 - TMT 1946 3:25:44",
            "3:30 - IRST 1977_10 3:30",
            "4 Iran IR%sT 1979 4",
            "3:30 Iran IR%sT"
        ],
        "Asia/Thimphu": [
            "5:58:36 - LMT 1947_7_15 5:58:36",
            "5:30 - IST 1987_9 5:30",
            "6 - BTT"
        ],
        "Asia/Tokyo": [
            "9:18:59 - LMT 1887_11_31_15",
            "9 - JST 1896 9",
            "9 - CJT 1938 9",
            "9 Japan J%sT"
        ],
        "Asia/Ulaanbaatar": [
            "7:7:32 - LMT 1905_7 7:7:32",
            "7 - ULAT 1978 7",
            "8 Mongol ULA%sT"
        ],
        "Asia/Urumqi": [
            "5:50:20 - LMT 1928 5:50:20",
            "6 - URUT 1980_4 6",
            "8 PRC C%sT"
        ],
        "Asia/Ust-Nera": [
            "9:32:54 - LMT 1919_11_15 9:32:54",
            "8 - YAKT 1930_5_21 8",
            "9 Russia YAKT 1981_3_1 9",
            "11 Russia MAG%sT 1991_2_31_2 11",
            "10 Russia MAG%sT 1992_0_19_2 10",
            "11 Russia MAG%sT 2011_2_27_2 11",
            "12 - MAGT 2011_8_13_0 12",
            "11 - VLAT"
        ],
        "Asia/Vientiane": [
            "6:50:24 - LMT 1906_5_9 6:50:24",
            "7:6:20 - SMT 1911_2_11_0_1 7:6:20",
            "7 - ICT 1912_4 7",
            "8 - ICT 1931_4 8",
            "7 - ICT"
        ],
        "Asia/Vladivostok": [
            "8:47:44 - LMT 1922_10_15 8:47:44",
            "9 - VLAT 1930_5_21 9",
            "10 Russia VLA%sT 1991_2_31_2 10",
            "9 Russia VLA%sST 1992_0_19_2 9",
            "10 Russia VLA%sT 2011_2_27_2 10",
            "11 - VLAT"
        ],
        "Asia/Yakutsk": [
            "8:38:40 - LMT 1919_11_15 8:38:40",
            "8 - YAKT 1930_5_21 8",
            "9 Russia YAK%sT 1991_2_31_2 9",
            "8 Russia YAK%sT 1992_0_19_2 8",
            "9 Russia YAK%sT 2011_2_27_2 9",
            "10 - YAKT"
        ],
        "Asia/Yekaterinburg": [
            "4:2:24 - LMT 1919_6_15_4 4:2:24",
            "4 - SVET 1930_5_21 4",
            "5 Russia SVE%sT 1991_2_31_2 5",
            "4 Russia SVE%sT 1992_0_19_2 4",
            "5 Russia YEK%sT 2011_2_27_2 5",
            "6 - YEKT"
        ],
        "Asia/Yerevan": [
            "2:58 - LMT 1924_4_2 2:58",
            "3 - YERT 1957_2 3",
            "4 RussiaAsia YER%sT 1991_2_31_2 4",
            "4 - YERST 1991_8_23 4",
            "3 RussiaAsia AM%sT 1995_8_24_2 3",
            "4 - AMT 1997 4",
            "4 RussiaAsia AM%sT 2012_2_25_2 4",
            "4 - AMT"
        ]
    },
    "rules": {
        "US": [
            "1918 1919 2 0 8 2 0 1 D",
            "1918 1919 9 0 8 2 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 30 7 2 0 0 S",
            "1967 2006 9 0 8 2 0 0 S",
            "1967 1973 3 0 8 2 0 1 D",
            "1974 1974 0 6 7 2 0 1 D",
            "1975 1975 1 23 7 2 0 1 D",
            "1976 1986 3 0 8 2 0 1 D",
            "1987 2006 3 1 0 2 0 1 D",
            "2007 9999 2 8 0 2 0 1 D",
            "2007 9999 10 1 0 2 0 0 S"
        ],
        "Brazil": [
            "1931 1931 9 3 7 11 0 1 S",
            "1932 1933 3 1 7 0 0 0",
            "1932 1932 9 3 7 0 0 1 S",
            "1949 1952 11 1 7 0 0 1 S",
            "1950 1950 3 16 7 1 0 0",
            "1951 1952 3 1 7 0 0 0",
            "1953 1953 2 1 7 0 0 0",
            "1963 1963 11 9 7 0 0 1 S",
            "1964 1964 2 1 7 0 0 0",
            "1965 1965 0 31 7 0 0 1 S",
            "1965 1965 2 31 7 0 0 0",
            "1965 1965 11 1 7 0 0 1 S",
            "1966 1968 2 1 7 0 0 0",
            "1966 1967 10 1 7 0 0 1 S",
            "1985 1985 10 2 7 0 0 1 S",
            "1986 1986 2 15 7 0 0 0",
            "1986 1986 9 25 7 0 0 1 S",
            "1987 1987 1 14 7 0 0 0",
            "1987 1987 9 25 7 0 0 1 S",
            "1988 1988 1 7 7 0 0 0",
            "1988 1988 9 16 7 0 0 1 S",
            "1989 1989 0 29 7 0 0 0",
            "1989 1989 9 15 7 0 0 1 S",
            "1990 1990 1 11 7 0 0 0",
            "1990 1990 9 21 7 0 0 1 S",
            "1991 1991 1 17 7 0 0 0",
            "1991 1991 9 20 7 0 0 1 S",
            "1992 1992 1 9 7 0 0 0",
            "1992 1992 9 25 7 0 0 1 S",
            "1993 1993 0 31 7 0 0 0",
            "1993 1995 9 11 0 0 0 1 S",
            "1994 1995 1 15 0 0 0 0",
            "1996 1996 1 11 7 0 0 0",
            "1996 1996 9 6 7 0 0 1 S",
            "1997 1997 1 16 7 0 0 0",
            "1997 1997 9 6 7 0 0 1 S",
            "1998 1998 2 1 7 0 0 0",
            "1998 1998 9 11 7 0 0 1 S",
            "1999 1999 1 21 7 0 0 0",
            "1999 1999 9 3 7 0 0 1 S",
            "2000 2000 1 27 7 0 0 0",
            "2000 2001 9 8 0 0 0 1 S",
            "2001 2006 1 15 0 0 0 0",
            "2002 2002 10 3 7 0 0 1 S",
            "2003 2003 9 19 7 0 0 1 S",
            "2004 2004 10 2 7 0 0 1 S",
            "2005 2005 9 16 7 0 0 1 S",
            "2006 2006 10 5 7 0 0 1 S",
            "2007 2007 1 25 7 0 0 0",
            "2007 2007 9 8 0 0 0 1 S",
            "2008 9999 9 15 0 0 0 1 S",
            "2008 2011 1 15 0 0 0 0",
            "2012 2012 1 22 0 0 0 0",
            "2013 2014 1 15 0 0 0 0",
            "2015 2015 1 22 0 0 0 0",
            "2016 2022 1 15 0 0 0 0",
            "2023 2023 1 22 0 0 0 0",
            "2024 2025 1 15 0 0 0 0",
            "2026 2026 1 22 0 0 0 0",
            "2027 2033 1 15 0 0 0 0",
            "2034 2034 1 22 0 0 0 0",
            "2035 2036 1 15 0 0 0 0",
            "2037 2037 1 22 0 0 0 0",
            "2038 9999 1 15 0 0 0 0"
        ],
        "Arg": [
            "1930 1930 11 1 7 0 0 1 S",
            "1931 1931 3 1 7 0 0 0",
            "1931 1931 9 15 7 0 0 1 S",
            "1932 1940 2 1 7 0 0 0",
            "1932 1939 10 1 7 0 0 1 S",
            "1940 1940 6 1 7 0 0 1 S",
            "1941 1941 5 15 7 0 0 0",
            "1941 1941 9 15 7 0 0 1 S",
            "1943 1943 7 1 7 0 0 0",
            "1943 1943 9 15 7 0 0 1 S",
            "1946 1946 2 1 7 0 0 0",
            "1946 1946 9 1 7 0 0 1 S",
            "1963 1963 9 1 7 0 0 0",
            "1963 1963 11 15 7 0 0 1 S",
            "1964 1966 2 1 7 0 0 0",
            "1964 1966 9 15 7 0 0 1 S",
            "1967 1967 3 2 7 0 0 0",
            "1967 1968 9 1 0 0 0 1 S",
            "1968 1969 3 1 0 0 0 0",
            "1974 1974 0 23 7 0 0 1 S",
            "1974 1974 4 1 7 0 0 0",
            "1988 1988 11 1 7 0 0 1 S",
            "1989 1993 2 1 0 0 0 0",
            "1989 1992 9 15 0 0 0 1 S",
            "1999 1999 9 1 0 0 0 1 S",
            "2000 2000 2 3 7 0 0 0",
            "2007 2007 11 30 7 0 0 1 S",
            "2008 2009 2 15 0 0 0 0",
            "2008 2008 9 15 0 0 0 1 S"
        ],
        "SanLuis": [
            "2008 2009 2 8 0 0 0 0",
            "2007 2009 9 8 0 0 0 1 S"
        ],
        "Para": [
            "1975 1988 9 1 7 0 0 1 S",
            "1975 1978 2 1 7 0 0 0",
            "1979 1991 3 1 7 0 0 0",
            "1989 1989 9 22 7 0 0 1 S",
            "1990 1990 9 1 7 0 0 1 S",
            "1991 1991 9 6 7 0 0 1 S",
            "1992 1992 2 1 7 0 0 0",
            "1992 1992 9 5 7 0 0 1 S",
            "1993 1993 2 31 7 0 0 0",
            "1993 1995 9 1 7 0 0 1 S",
            "1994 1995 1 0 8 0 0 0",
            "1996 1996 2 1 7 0 0 0",
            "1996 2001 9 1 0 0 0 1 S",
            "1997 1997 1 0 8 0 0 0",
            "1998 2001 2 1 0 0 0 0",
            "2002 2004 3 1 0 0 0 0",
            "2002 2003 8 1 0 0 0 1 S",
            "2004 2009 9 15 0 0 0 1 S",
            "2005 2009 2 8 0 0 0 0",
            "2010 9999 9 1 0 0 0 1 S",
            "2010 2012 3 8 0 0 0 0",
            "2013 9999 2 22 0 0 0 0"
        ],
        "Canada": [
            "1918 1918 3 14 7 2 0 1 D",
            "1918 1918 9 27 7 2 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 30 7 2 0 0 S",
            "1974 1986 3 0 8 2 0 1 D",
            "1974 2006 9 0 8 2 0 0 S",
            "1987 2006 3 1 0 2 0 1 D",
            "2007 9999 2 8 0 2 0 1 D",
            "2007 9999 10 1 0 2 0 0 S"
        ],
        "Mexico": [
            "1939 1939 1 5 7 0 0 1 D",
            "1939 1939 5 25 7 0 0 0 S",
            "1940 1940 11 9 7 0 0 1 D",
            "1941 1941 3 1 7 0 0 0 S",
            "1943 1943 11 16 7 0 0 1 W",
            "1944 1944 4 1 7 0 0 0 S",
            "1950 1950 1 12 7 0 0 1 D",
            "1950 1950 6 30 7 0 0 0 S",
            "1996 2000 3 1 0 2 0 1 D",
            "1996 2000 9 0 8 2 0 0 S",
            "2001 2001 4 1 0 2 0 1 D",
            "2001 2001 8 0 8 2 0 0 S",
            "2002 9999 3 1 0 2 0 1 D",
            "2002 9999 9 0 8 2 0 0 S"
        ],
        "Barb": [
            "1977 1977 5 12 7 2 0 1 D",
            "1977 1978 9 1 0 2 0 0 S",
            "1978 1980 3 15 0 2 0 1 D",
            "1979 1979 8 30 7 2 0 0 S",
            "1980 1980 8 25 7 2 0 0 S"
        ],
        "Belize": [
            "1918 1942 9 2 0 0 0 0:30 HD",
            "1919 1943 1 9 0 0 0 0 S",
            "1973 1973 11 5 7 0 0 1 D",
            "1974 1974 1 9 7 0 0 0 S",
            "1982 1982 11 18 7 0 0 1 D",
            "1983 1983 1 12 7 0 0 0 S"
        ],
        "CO": [
            "1992 1992 4 3 7 0 0 1 S",
            "1993 1993 3 4 7 0 0 0"
        ],
        "NT_YK": [
            "1918 1918 3 14 7 2 0 1 D",
            "1918 1918 9 27 7 2 0 0 S",
            "1919 1919 4 25 7 2 0 1 D",
            "1919 1919 10 1 7 0 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 30 7 2 0 0 S",
            "1965 1965 3 0 8 0 0 2 DD",
            "1965 1965 9 0 8 2 0 0 S",
            "1980 1986 3 0 8 2 0 1 D",
            "1980 2006 9 0 8 2 0 0 S",
            "1987 2006 3 1 0 2 0 1 D"
        ],
        "Chicago": [
            "1920 1920 5 13 7 2 0 1 D",
            "1920 1921 9 0 8 2 0 0 S",
            "1921 1921 2 0 8 2 0 1 D",
            "1922 1966 3 0 8 2 0 1 D",
            "1922 1954 8 0 8 2 0 0 S",
            "1955 1966 9 0 8 2 0 0 S"
        ],
        "CR": [
            "1979 1980 1 0 8 0 0 1 D",
            "1979 1980 5 1 0 0 0 0 S",
            "1991 1992 0 15 6 0 0 1 D",
            "1991 1991 6 1 7 0 0 0 S",
            "1992 1992 2 15 7 0 0 0 S"
        ],
        "EU": [
            "1977 1980 3 1 0 1 1 1 S",
            "1977 1977 8 0 8 1 1 0",
            "1978 1978 9 1 7 1 1 0",
            "1979 1995 8 0 8 1 1 0",
            "1981 9999 2 0 8 1 1 1 S",
            "1996 9999 9 0 8 1 1 0"
        ],
        "Vanc": [
            "1918 1918 3 14 7 2 0 1 D",
            "1918 1918 9 27 7 2 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 30 7 2 0 0 S",
            "1946 1986 3 0 8 2 0 1 D",
            "1946 1946 9 13 7 2 0 0 S",
            "1947 1961 8 0 8 2 0 0 S",
            "1962 2006 9 0 8 2 0 0 S"
        ],
        "Denver": [
            "1920 1921 2 0 8 2 0 1 D",
            "1920 1920 9 0 8 2 0 0 S",
            "1921 1921 4 22 7 2 0 0 S",
            "1965 1966 3 0 8 2 0 1 D",
            "1965 1966 9 0 8 2 0 0 S"
        ],
        "Detroit": [
            "1948 1948 3 0 8 2 0 1 D",
            "1948 1948 8 0 8 2 0 0 S",
            "1967 1967 5 14 7 2 0 1 D",
            "1967 1967 9 0 8 2 0 0 S"
        ],
        "Edm": [
            "1918 1919 3 8 0 2 0 1 D",
            "1918 1918 9 27 7 2 0 0 S",
            "1919 1919 4 27 7 2 0 0 S",
            "1920 1923 3 0 8 2 0 1 D",
            "1920 1920 9 0 8 2 0 0 S",
            "1921 1923 8 0 8 2 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 0 8 2 0 0 S",
            "1947 1947 3 0 8 2 0 1 D",
            "1947 1947 8 0 8 2 0 0 S",
            "1967 1967 3 0 8 2 0 1 D",
            "1967 1967 9 0 8 2 0 0 S",
            "1969 1969 3 0 8 2 0 1 D",
            "1969 1969 9 0 8 2 0 0 S",
            "1972 1986 3 0 8 2 0 1 D",
            "1972 2006 9 0 8 2 0 0 S"
        ],
        "Salv": [
            "1987 1988 4 1 0 0 0 1 D",
            "1987 1988 8 0 8 0 0 0 S"
        ],
        "Halifax": [
            "1916 1916 3 1 7 0 0 1 D",
            "1916 1916 9 1 7 0 0 0 S",
            "1920 1920 4 9 7 0 0 1 D",
            "1920 1920 7 29 7 0 0 0 S",
            "1921 1921 4 6 7 0 0 1 D",
            "1921 1922 8 5 7 0 0 0 S",
            "1922 1922 3 30 7 0 0 1 D",
            "1923 1925 4 1 0 0 0 1 D",
            "1923 1923 8 4 7 0 0 0 S",
            "1924 1924 8 15 7 0 0 0 S",
            "1925 1925 8 28 7 0 0 0 S",
            "1926 1926 4 16 7 0 0 1 D",
            "1926 1926 8 13 7 0 0 0 S",
            "1927 1927 4 1 7 0 0 1 D",
            "1927 1927 8 26 7 0 0 0 S",
            "1928 1931 4 8 0 0 0 1 D",
            "1928 1928 8 9 7 0 0 0 S",
            "1929 1929 8 3 7 0 0 0 S",
            "1930 1930 8 15 7 0 0 0 S",
            "1931 1932 8 24 1 0 0 0 S",
            "1932 1932 4 1 7 0 0 1 D",
            "1933 1933 3 30 7 0 0 1 D",
            "1933 1933 9 2 7 0 0 0 S",
            "1934 1934 4 20 7 0 0 1 D",
            "1934 1934 8 16 7 0 0 0 S",
            "1935 1935 5 2 7 0 0 1 D",
            "1935 1935 8 30 7 0 0 0 S",
            "1936 1936 5 1 7 0 0 1 D",
            "1936 1936 8 14 7 0 0 0 S",
            "1937 1938 4 1 0 0 0 1 D",
            "1937 1941 8 24 1 0 0 0 S",
            "1939 1939 4 28 7 0 0 1 D",
            "1940 1941 4 1 0 0 0 1 D",
            "1946 1949 3 0 8 2 0 1 D",
            "1946 1949 8 0 8 2 0 0 S",
            "1951 1954 3 0 8 2 0 1 D",
            "1951 1954 8 0 8 2 0 0 S",
            "1956 1959 3 0 8 2 0 1 D",
            "1956 1959 8 0 8 2 0 0 S",
            "1962 1973 3 0 8 2 0 1 D",
            "1962 1973 9 0 8 2 0 0 S"
        ],
        "StJohns": [
            "1917 1917 3 8 7 2 0 1 D",
            "1917 1917 8 17 7 2 0 0 S",
            "1919 1919 4 5 7 23 0 1 D",
            "1919 1919 7 12 7 23 0 0 S",
            "1920 1935 4 1 0 23 0 1 D",
            "1920 1935 9 0 8 23 0 0 S",
            "1936 1941 4 9 1 0 0 1 D",
            "1936 1941 9 2 1 0 0 0 S",
            "1946 1950 4 8 0 2 0 1 D",
            "1946 1950 9 2 0 2 0 0 S",
            "1951 1986 3 0 8 2 0 1 D",
            "1951 1959 8 0 8 2 0 0 S",
            "1960 1986 9 0 8 2 0 0 S",
            "1987 1987 3 1 0 0:1 0 1 D",
            "1987 2006 9 0 8 0:1 0 0 S",
            "1988 1988 3 1 0 0:1 0 2 DD",
            "1989 2006 3 1 0 0:1 0 1 D",
            "2007 2011 2 8 0 0:1 0 1 D",
            "2007 2010 10 1 0 0:1 0 0 S"
        ],
        "TC": [
            "1979 1986 3 0 8 2 0 1 D",
            "1979 2006 9 0 8 2 0 0 S",
            "1987 2006 3 1 0 2 0 1 D",
            "2007 9999 2 8 0 2 0 1 D",
            "2007 9999 10 1 0 2 0 0 S"
        ],
        "Guat": [
            "1973 1973 10 25 7 0 0 1 D",
            "1974 1974 1 24 7 0 0 0 S",
            "1983 1983 4 21 7 0 0 1 D",
            "1983 1983 8 22 7 0 0 0 S",
            "1991 1991 2 23 7 0 0 1 D",
            "1991 1991 8 7 7 0 0 0 S",
            "2006 2006 3 30 7 0 0 1 D",
            "2006 2006 9 1 7 0 0 0 S"
        ],
        "Cuba": [
            "1928 1928 5 10 7 0 0 1 D",
            "1928 1928 9 10 7 0 0 0 S",
            "1940 1942 5 1 0 0 0 1 D",
            "1940 1942 8 1 0 0 0 0 S",
            "1945 1946 5 1 0 0 0 1 D",
            "1945 1946 8 1 0 0 0 0 S",
            "1965 1965 5 1 7 0 0 1 D",
            "1965 1965 8 30 7 0 0 0 S",
            "1966 1966 4 29 7 0 0 1 D",
            "1966 1966 9 2 7 0 0 0 S",
            "1967 1967 3 8 7 0 0 1 D",
            "1967 1968 8 8 0 0 0 0 S",
            "1968 1968 3 14 7 0 0 1 D",
            "1969 1977 3 0 8 0 0 1 D",
            "1969 1971 9 0 8 0 0 0 S",
            "1972 1974 9 8 7 0 0 0 S",
            "1975 1977 9 0 8 0 0 0 S",
            "1978 1978 4 7 7 0 0 1 D",
            "1978 1990 9 8 0 0 0 0 S",
            "1979 1980 2 15 0 0 0 1 D",
            "1981 1985 4 5 0 0 0 1 D",
            "1986 1989 2 14 0 0 0 1 D",
            "1990 1997 3 1 0 0 0 1 D",
            "1991 1995 9 8 0 0 2 0 S",
            "1996 1996 9 6 7 0 2 0 S",
            "1997 1997 9 12 7 0 2 0 S",
            "1998 1999 2 0 8 0 2 1 D",
            "1998 2003 9 0 8 0 2 0 S",
            "2000 2004 3 1 0 0 2 1 D",
            "2006 2010 9 0 8 0 2 0 S",
            "2007 2007 2 8 0 0 2 1 D",
            "2008 2008 2 15 0 0 2 1 D",
            "2009 2010 2 8 0 0 2 1 D",
            "2011 2011 2 15 0 0 2 1 D",
            "2011 2011 10 13 7 0 2 0 S",
            "2012 2012 3 1 7 0 2 1 D",
            "2012 9999 10 1 0 0 2 0 S",
            "2013 9999 2 8 0 0 2 1 D"
        ],
        "Indianapolis": [
            "1941 1941 5 22 7 2 0 1 D",
            "1941 1954 8 0 8 2 0 0 S",
            "1946 1954 3 0 8 2 0 1 D"
        ],
        "Starke": [
            "1947 1961 3 0 8 2 0 1 D",
            "1947 1954 8 0 8 2 0 0 S",
            "1955 1956 9 0 8 2 0 0 S",
            "1957 1958 8 0 8 2 0 0 S",
            "1959 1961 9 0 8 2 0 0 S"
        ],
        "Marengo": [
            "1951 1951 3 0 8 2 0 1 D",
            "1951 1951 8 0 8 2 0 0 S",
            "1954 1960 3 0 8 2 0 1 D",
            "1954 1960 8 0 8 2 0 0 S"
        ],
        "Pike": [
            "1955 1955 4 1 7 0 0 1 D",
            "1955 1960 8 0 8 2 0 0 S",
            "1956 1964 3 0 8 2 0 1 D",
            "1961 1964 9 0 8 2 0 0 S"
        ],
        "Perry": [
            "1946 1946 3 0 8 2 0 1 D",
            "1946 1946 8 0 8 2 0 0 S",
            "1953 1954 3 0 8 2 0 1 D",
            "1953 1959 8 0 8 2 0 0 S",
            "1955 1955 4 1 7 0 0 1 D",
            "1956 1963 3 0 8 2 0 1 D",
            "1960 1960 9 0 8 2 0 0 S",
            "1961 1961 8 0 8 2 0 0 S",
            "1962 1963 9 0 8 2 0 0 S"
        ],
        "Vincennes": [
            "1946 1946 3 0 8 2 0 1 D",
            "1946 1946 8 0 8 2 0 0 S",
            "1953 1954 3 0 8 2 0 1 D",
            "1953 1959 8 0 8 2 0 0 S",
            "1955 1955 4 1 7 0 0 1 D",
            "1956 1963 3 0 8 2 0 1 D",
            "1960 1960 9 0 8 2 0 0 S",
            "1961 1961 8 0 8 2 0 0 S",
            "1962 1963 9 0 8 2 0 0 S"
        ],
        "Pulaski": [
            "1946 1960 3 0 8 2 0 1 D",
            "1946 1954 8 0 8 2 0 0 S",
            "1955 1956 9 0 8 2 0 0 S",
            "1957 1960 8 0 8 2 0 0 S"
        ],
        "Louisville": [
            "1921 1921 4 1 7 2 0 1 D",
            "1921 1921 8 1 7 2 0 0 S",
            "1941 1961 3 0 8 2 0 1 D",
            "1941 1941 8 0 8 2 0 0 S",
            "1946 1946 5 2 7 2 0 0 S",
            "1950 1955 8 0 8 2 0 0 S",
            "1956 1960 9 0 8 2 0 0 S"
        ],
        "Peru": [
            "1938 1938 0 1 7 0 0 1 S",
            "1938 1938 3 1 7 0 0 0",
            "1938 1939 8 0 8 0 0 1 S",
            "1939 1940 2 24 0 0 0 0",
            "1986 1987 0 1 7 0 0 1 S",
            "1986 1987 3 1 7 0 0 0",
            "1990 1990 0 1 7 0 0 1 S",
            "1990 1990 3 1 7 0 0 0",
            "1994 1994 0 1 7 0 0 1 S",
            "1994 1994 3 1 7 0 0 0"
        ],
        "CA": [
            "1948 1948 2 14 7 2 0 1 D",
            "1949 1949 0 1 7 2 0 0 S",
            "1950 1966 3 0 8 2 0 1 D",
            "1950 1961 8 0 8 2 0 0 S",
            "1962 1966 9 0 8 2 0 0 S"
        ],
        "Nic": [
            "1979 1980 2 16 0 0 0 1 D",
            "1979 1980 5 23 1 0 0 0 S",
            "2005 2005 3 10 7 0 0 1 D",
            "2005 2005 9 1 0 0 0 0 S",
            "2006 2006 3 30 7 2 0 1 D",
            "2006 2006 9 1 0 1 0 0 S"
        ],
        "Menominee": [
            "1946 1946 3 0 8 2 0 1 D",
            "1946 1946 8 0 8 2 0 0 S",
            "1966 1966 3 0 8 2 0 1 D",
            "1966 1966 9 0 8 2 0 0 S"
        ],
        "Moncton": [
            "1933 1935 5 8 0 1 0 1 D",
            "1933 1935 8 8 0 1 0 0 S",
            "1936 1938 5 1 0 1 0 1 D",
            "1936 1938 8 1 0 1 0 0 S",
            "1939 1939 4 27 7 1 0 1 D",
            "1939 1941 8 21 6 1 0 0 S",
            "1940 1940 4 19 7 1 0 1 D",
            "1941 1941 4 4 7 1 0 1 D",
            "1946 1972 3 0 8 2 0 1 D",
            "1946 1956 8 0 8 2 0 0 S",
            "1957 1972 9 0 8 2 0 0 S",
            "1993 2006 3 1 0 0:1 0 1 D",
            "1993 2006 9 0 8 0:1 0 0 S"
        ],
        "Uruguay": [
            "1923 1923 9 2 7 0 0 0:30 HS",
            "1924 1926 3 1 7 0 0 0",
            "1924 1925 9 1 7 0 0 0:30 HS",
            "1933 1935 9 0 8 0 0 0:30 HS",
            "1934 1936 2 25 6 23:30 2 0",
            "1936 1936 10 1 7 0 0 0:30 HS",
            "1937 1941 2 0 8 0 0 0",
            "1937 1940 9 0 8 0 0 0:30 HS",
            "1941 1941 7 1 7 0 0 0:30 HS",
            "1942 1942 0 1 7 0 0 0",
            "1942 1942 11 14 7 0 0 1 S",
            "1943 1943 2 14 7 0 0 0",
            "1959 1959 4 24 7 0 0 1 S",
            "1959 1959 10 15 7 0 0 0",
            "1960 1960 0 17 7 0 0 1 S",
            "1960 1960 2 6 7 0 0 0",
            "1965 1967 3 1 0 0 0 1 S",
            "1965 1965 8 26 7 0 0 0",
            "1966 1967 9 31 7 0 0 0",
            "1968 1970 4 27 7 0 0 0:30 HS",
            "1968 1970 11 2 7 0 0 0",
            "1972 1972 3 24 7 0 0 1 S",
            "1972 1972 7 15 7 0 0 0",
            "1974 1974 2 10 7 0 0 0:30 HS",
            "1974 1974 11 22 7 0 0 1 S",
            "1976 1976 9 1 7 0 0 0",
            "1977 1977 11 4 7 0 0 1 S",
            "1978 1978 3 1 7 0 0 0",
            "1979 1979 9 1 7 0 0 1 S",
            "1980 1980 4 1 7 0 0 0",
            "1987 1987 11 14 7 0 0 1 S",
            "1988 1988 2 14 7 0 0 0",
            "1988 1988 11 11 7 0 0 1 S",
            "1989 1989 2 12 7 0 0 0",
            "1989 1989 9 29 7 0 0 1 S",
            "1990 1992 2 1 0 0 0 0",
            "1990 1991 9 21 0 0 0 1 S",
            "1992 1992 9 18 7 0 0 1 S",
            "1993 1993 1 28 7 0 0 0",
            "2004 2004 8 19 7 0 0 1 S",
            "2005 2005 2 27 7 2 0 0",
            "2005 2005 9 9 7 2 0 1 S",
            "2006 2006 2 12 7 2 0 0",
            "2006 9999 9 1 0 2 0 1 S",
            "2007 9999 2 8 0 2 0 0"
        ],
        "Mont": [
            "1917 1917 2 25 7 2 0 1 D",
            "1917 1917 3 24 7 0 0 0 S",
            "1919 1919 2 31 7 2:30 0 1 D",
            "1919 1919 9 25 7 2:30 0 0 S",
            "1920 1920 4 2 7 2:30 0 1 D",
            "1920 1922 9 1 0 2:30 0 0 S",
            "1921 1921 4 1 7 2 0 1 D",
            "1922 1922 3 30 7 2 0 1 D",
            "1924 1924 4 17 7 2 0 1 D",
            "1924 1926 8 0 8 2:30 0 0 S",
            "1925 1926 4 1 0 2 0 1 D",
            "1927 1927 4 1 7 0 0 1 D",
            "1927 1932 8 0 8 0 0 0 S",
            "1928 1931 3 0 8 0 0 1 D",
            "1932 1932 4 1 7 0 0 1 D",
            "1933 1940 3 0 8 0 0 1 D",
            "1933 1933 9 1 7 0 0 0 S",
            "1934 1939 8 0 8 0 0 0 S",
            "1946 1973 3 0 8 2 0 1 D",
            "1945 1948 8 0 8 2 0 0 S",
            "1949 1950 9 0 8 2 0 0 S",
            "1951 1956 8 0 8 2 0 0 S",
            "1957 1973 9 0 8 2 0 0 S"
        ],
        "Bahamas": [
            "1964 1975 9 0 8 2 0 0 S",
            "1964 1975 3 0 8 2 0 1 D"
        ],
        "NYC": [
            "1920 1920 2 0 8 2 0 1 D",
            "1920 1920 9 0 8 2 0 0 S",
            "1921 1966 3 0 8 2 0 1 D",
            "1921 1954 8 0 8 2 0 0 S",
            "1955 1966 9 0 8 2 0 0 S"
        ],
        "Haiti": [
            "1983 1983 4 8 7 0 0 1 D",
            "1984 1987 3 0 8 0 0 1 D",
            "1983 1987 9 0 8 0 0 0 S",
            "1988 1997 3 1 0 1 2 1 D",
            "1988 1997 9 0 8 1 2 0 S",
            "2005 2006 3 1 0 0 0 1 D",
            "2005 2006 9 0 8 0 0 0 S",
            "2012 9999 2 8 0 2 0 1 D",
            "2012 9999 10 1 0 2 0 0 S"
        ],
        "Regina": [
            "1918 1918 3 14 7 2 0 1 D",
            "1918 1918 9 27 7 2 0 0 S",
            "1930 1934 4 1 0 0 0 1 D",
            "1930 1934 9 1 0 0 0 0 S",
            "1937 1941 3 8 0 0 0 1 D",
            "1937 1937 9 8 0 0 0 0 S",
            "1938 1938 9 1 0 0 0 0 S",
            "1939 1941 9 8 0 0 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 0 8 2 0 0 S",
            "1946 1946 3 8 0 2 0 1 D",
            "1946 1946 9 8 0 2 0 0 S",
            "1947 1957 3 0 8 2 0 1 D",
            "1947 1957 8 0 8 2 0 0 S",
            "1959 1959 3 0 8 2 0 1 D",
            "1959 1959 9 0 8 2 0 0 S"
        ],
        "Chile": [
            "1927 1932 8 1 7 0 0 1 S",
            "1928 1932 3 1 7 0 0 0",
            "1942 1942 5 1 7 4 1 0",
            "1942 1942 7 1 7 5 1 1 S",
            "1946 1946 6 15 7 4 1 1 S",
            "1946 1946 8 1 7 3 1 0",
            "1947 1947 3 1 7 4 1 0",
            "1968 1968 10 3 7 4 1 1 S",
            "1969 1969 2 30 7 3 1 0",
            "1969 1969 10 23 7 4 1 1 S",
            "1970 1970 2 29 7 3 1 0",
            "1971 1971 2 14 7 3 1 0",
            "1970 1972 9 9 0 4 1 1 S",
            "1972 1986 2 9 0 3 1 0",
            "1973 1973 8 30 7 4 1 1 S",
            "1974 1987 9 9 0 4 1 1 S",
            "1987 1987 3 12 7 3 1 0",
            "1988 1989 2 9 0 3 1 0",
            "1988 1988 9 1 0 4 1 1 S",
            "1989 1989 9 9 0 4 1 1 S",
            "1990 1990 2 18 7 3 1 0",
            "1990 1990 8 16 7 4 1 1 S",
            "1991 1996 2 9 0 3 1 0",
            "1991 1997 9 9 0 4 1 1 S",
            "1997 1997 2 30 7 3 1 0",
            "1998 1998 2 9 0 3 1 0",
            "1998 1998 8 27 7 4 1 1 S",
            "1999 1999 3 4 7 3 1 0",
            "1999 2010 9 9 0 4 1 1 S",
            "2000 2007 2 9 0 3 1 0",
            "2008 2008 2 30 7 3 1 0",
            "2009 2009 2 9 0 3 1 0",
            "2010 2010 3 1 0 3 1 0",
            "2011 2011 4 2 0 3 1 0",
            "2011 2011 7 16 0 4 1 1 S",
            "2012 9999 3 23 0 3 1 0",
            "2012 9999 8 2 0 4 1 1 S"
        ],
        "DR": [
            "1966 1966 9 30 7 0 0 1 D",
            "1967 1967 1 28 7 0 0 0 S",
            "1969 1973 9 0 8 0 0 0:30 HD",
            "1970 1970 1 21 7 0 0 0 S",
            "1971 1971 0 20 7 0 0 0 S",
            "1972 1974 0 21 7 0 0 0 S"
        ],
        "C-Eur": [
            "1916 1916 3 30 7 23 0 1 S",
            "1916 1916 9 1 7 1 0 0",
            "1917 1918 3 15 1 2 2 1 S",
            "1917 1918 8 15 1 2 2 0",
            "1940 1940 3 1 7 2 2 1 S",
            "1942 1942 10 2 7 2 2 0",
            "1943 1943 2 29 7 2 2 1 S",
            "1943 1943 9 4 7 2 2 0",
            "1944 1945 3 1 1 2 2 1 S",
            "1944 1944 9 2 7 2 2 0",
            "1945 1945 8 16 7 2 2 0",
            "1977 1980 3 1 0 2 2 1 S",
            "1977 1977 8 0 8 2 2 0",
            "1978 1978 9 1 7 2 2 0",
            "1979 1995 8 0 8 2 2 0",
            "1981 9999 2 0 8 2 2 1 S",
            "1996 9999 9 0 8 2 2 0"
        ],
        "Swift": [
            "1957 1957 3 0 8 2 0 1 D",
            "1957 1957 9 0 8 2 0 0 S",
            "1959 1961 3 0 8 2 0 1 D",
            "1959 1959 9 0 8 2 0 0 S",
            "1960 1961 8 0 8 2 0 0 S"
        ],
        "Hond": [
            "1987 1988 4 1 0 0 0 1 D",
            "1987 1988 8 0 8 0 0 0 S",
            "2006 2006 4 1 0 0 0 1 D",
            "2006 2006 7 1 1 0 0 0 S"
        ],
        "Thule": [
            "1991 1992 2 0 8 2 0 1 D",
            "1991 1992 8 0 8 2 0 0 S",
            "1993 2006 3 1 0 2 0 1 D",
            "1993 2006 9 0 8 2 0 0 S",
            "2007 9999 2 8 0 2 0 1 D",
            "2007 9999 10 1 0 2 0 0 S"
        ],
        "Toronto": [
            "1919 1919 2 30 7 23:30 0 1 D",
            "1919 1919 9 26 7 0 0 0 S",
            "1920 1920 4 2 7 2 0 1 D",
            "1920 1920 8 26 7 0 0 0 S",
            "1921 1921 4 15 7 2 0 1 D",
            "1921 1921 8 15 7 2 0 0 S",
            "1922 1923 4 8 0 2 0 1 D",
            "1922 1926 8 15 0 2 0 0 S",
            "1924 1927 4 1 0 2 0 1 D",
            "1927 1932 8 0 8 2 0 0 S",
            "1928 1931 3 0 8 2 0 1 D",
            "1932 1932 4 1 7 2 0 1 D",
            "1933 1940 3 0 8 2 0 1 D",
            "1933 1933 9 1 7 2 0 0 S",
            "1934 1939 8 0 8 2 0 0 S",
            "1945 1946 8 0 8 2 0 0 S",
            "1946 1946 3 0 8 2 0 1 D",
            "1947 1949 3 0 8 0 0 1 D",
            "1947 1948 8 0 8 0 0 0 S",
            "1949 1949 10 0 8 0 0 0 S",
            "1950 1973 3 0 8 2 0 1 D",
            "1950 1950 10 0 8 2 0 0 S",
            "1951 1956 8 0 8 2 0 0 S",
            "1957 1973 9 0 8 2 0 0 S"
        ],
        "Winn": [
            "1916 1916 3 23 7 0 0 1 D",
            "1916 1916 8 17 7 0 0 0 S",
            "1918 1918 3 14 7 2 0 1 D",
            "1918 1918 9 27 7 2 0 0 S",
            "1937 1937 4 16 7 2 0 1 D",
            "1937 1937 8 26 7 2 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 0 8 2 0 0 S",
            "1946 1946 4 12 7 2 0 1 D",
            "1946 1946 9 13 7 2 0 0 S",
            "1947 1949 3 0 8 2 0 1 D",
            "1947 1949 8 0 8 2 0 0 S",
            "1950 1950 4 1 7 2 0 1 D",
            "1950 1950 8 30 7 2 0 0 S",
            "1951 1960 3 0 8 2 0 1 D",
            "1951 1958 8 0 8 2 0 0 S",
            "1959 1959 9 0 8 2 0 0 S",
            "1960 1960 8 0 8 2 0 0 S",
            "1963 1963 3 0 8 2 0 1 D",
            "1963 1963 8 22 7 2 0 0 S",
            "1966 1986 3 0 8 2 2 1 D",
            "1966 2005 9 0 8 2 2 0 S",
            "1987 2005 3 1 0 2 2 1 D"
        ],
        "RussiaAsia": [
            "1981 1984 3 1 7 0 0 1 S",
            "1981 1983 9 1 7 0 0 0",
            "1984 1991 8 0 8 2 2 0",
            "1985 1991 2 0 8 2 2 1 S",
            "1992 1992 2 6 8 23 0 1 S",
            "1992 1992 8 6 8 23 0 0",
            "1993 9999 2 0 8 2 2 1 S",
            "1993 1995 8 0 8 2 2 0",
            "1996 9999 9 0 8 2 2 0"
        ],
        "Jordan": [
            "1973 1973 5 6 7 0 0 1 S",
            "1973 1975 9 1 7 0 0 0",
            "1974 1977 4 1 7 0 0 1 S",
            "1976 1976 10 1 7 0 0 0",
            "1977 1977 9 1 7 0 0 0",
            "1978 1978 3 30 7 0 0 1 S",
            "1978 1978 8 30 7 0 0 0",
            "1985 1985 3 1 7 0 0 1 S",
            "1985 1985 9 1 7 0 0 0",
            "1986 1988 3 1 5 0 0 1 S",
            "1986 1990 9 1 5 0 0 0",
            "1989 1989 4 8 7 0 0 1 S",
            "1990 1990 3 27 7 0 0 1 S",
            "1991 1991 3 17 7 0 0 1 S",
            "1991 1991 8 27 7 0 0 0",
            "1992 1992 3 10 7 0 0 1 S",
            "1992 1993 9 1 5 0 0 0",
            "1993 1998 3 1 5 0 0 1 S",
            "1994 1994 8 15 5 0 0 0",
            "1995 1998 8 15 5 0 2 0",
            "1999 1999 6 1 7 0 2 1 S",
            "1999 2002 8 5 8 0 2 0",
            "2000 2001 2 4 8 0 2 1 S",
            "2002 9999 2 4 8 24 0 1 S",
            "2003 2003 9 24 7 0 2 0",
            "2004 2004 9 15 7 0 2 0",
            "2005 2005 8 5 8 0 2 0",
            "2006 2011 9 5 8 0 2 0",
            "2013 9999 9 5 8 0 2 0"
        ],
        "Russia": [
            "1917 1917 6 1 7 23 0 1 MST",
            "1917 1917 11 28 7 0 0 0 MMT",
            "1918 1918 4 31 7 22 0 2 MDST",
            "1918 1918 8 16 7 1 0 1 MST",
            "1919 1919 4 31 7 23 0 2 MDST",
            "1919 1919 6 1 7 2 0 1 S",
            "1919 1919 7 16 7 0 0 0",
            "1921 1921 1 14 7 23 0 1 S",
            "1921 1921 2 20 7 23 0 2 M",
            "1921 1921 8 1 7 0 0 1 S",
            "1921 1921 9 1 7 0 0 0",
            "1981 1984 3 1 7 0 0 1 S",
            "1981 1983 9 1 7 0 0 0",
            "1984 1991 8 0 8 2 2 0",
            "1985 1991 2 0 8 2 2 1 S",
            "1992 1992 2 6 8 23 0 1 S",
            "1992 1992 8 6 8 23 0 0",
            "1993 2010 2 0 8 2 2 1 S",
            "1993 1995 8 0 8 2 2 0",
            "1996 2010 9 0 8 2 2 0"
        ],
        "Iraq": [
            "1982 1982 4 1 7 0 0 1 D",
            "1982 1984 9 1 7 0 0 0 S",
            "1983 1983 2 31 7 0 0 1 D",
            "1984 1985 3 1 7 0 0 1 D",
            "1985 1990 8 0 8 1 2 0 S",
            "1986 1990 2 0 8 1 2 1 D",
            "1991 2007 3 1 7 3 2 1 D",
            "1991 2007 9 1 7 3 2 0 S"
        ],
        "EUAsia": [
            "1981 9999 2 0 8 1 1 1 S",
            "1979 1995 8 0 8 1 1 0",
            "1996 9999 9 0 8 1 1 0"
        ],
        "Azer": [
            "1997 9999 2 0 8 4 0 1 S",
            "1997 9999 9 0 8 5 0 0"
        ],
        "Lebanon": [
            "1920 1920 2 28 7 0 0 1 S",
            "1920 1920 9 25 7 0 0 0",
            "1921 1921 3 3 7 0 0 1 S",
            "1921 1921 9 3 7 0 0 0",
            "1922 1922 2 26 7 0 0 1 S",
            "1922 1922 9 8 7 0 0 0",
            "1923 1923 3 22 7 0 0 1 S",
            "1923 1923 8 16 7 0 0 0",
            "1957 1961 4 1 7 0 0 1 S",
            "1957 1961 9 1 7 0 0 0",
            "1972 1972 5 22 7 0 0 1 S",
            "1972 1977 9 1 7 0 0 0",
            "1973 1977 4 1 7 0 0 1 S",
            "1978 1978 3 30 7 0 0 1 S",
            "1978 1978 8 30 7 0 0 0",
            "1984 1987 4 1 7 0 0 1 S",
            "1984 1991 9 16 7 0 0 0",
            "1988 1988 5 1 7 0 0 1 S",
            "1989 1989 4 10 7 0 0 1 S",
            "1990 1992 4 1 7 0 0 1 S",
            "1992 1992 9 4 7 0 0 0",
            "1993 9999 2 0 8 0 0 1 S",
            "1993 1998 8 0 8 0 0 0",
            "1999 9999 9 0 8 0 0 0"
        ],
        "Kyrgyz": [
            "1992 1996 3 7 0 0 2 1 S",
            "1992 1996 8 0 8 0 0 0",
            "1997 2005 2 0 8 2:30 0 1 S",
            "1997 2004 9 0 8 2:30 0 0"
        ],
        "Mongol": [
            "1983 1984 3 1 7 0 0 1 S",
            "1983 1983 9 1 7 0 0 0",
            "1985 1998 2 0 8 0 0 1 S",
            "1984 1998 8 0 8 0 0 0",
            "2001 2001 3 6 8 2 0 1 S",
            "2001 2006 8 6 8 2 0 0",
            "2002 2006 2 6 8 2 0 1 S"
        ],
        "PRC": [
            "1986 1986 4 4 7 0 0 1 D",
            "1986 1991 8 11 0 0 0 0 S",
            "1987 1991 3 10 0 0 0 1 D"
        ],
        "Syria": [
            "1920 1923 3 15 0 2 0 1 S",
            "1920 1923 9 1 0 2 0 0",
            "1962 1962 3 29 7 2 0 1 S",
            "1962 1962 9 1 7 2 0 0",
            "1963 1965 4 1 7 2 0 1 S",
            "1963 1963 8 30 7 2 0 0",
            "1964 1964 9 1 7 2 0 0",
            "1965 1965 8 30 7 2 0 0",
            "1966 1966 3 24 7 2 0 1 S",
            "1966 1976 9 1 7 2 0 0",
            "1967 1978 4 1 7 2 0 1 S",
            "1977 1978 8 1 7 2 0 0",
            "1983 1984 3 9 7 2 0 1 S",
            "1983 1984 9 1 7 2 0 0",
            "1986 1986 1 16 7 2 0 1 S",
            "1986 1986 9 9 7 2 0 0",
            "1987 1987 2 1 7 2 0 1 S",
            "1987 1988 9 31 7 2 0 0",
            "1988 1988 2 15 7 2 0 1 S",
            "1989 1989 2 31 7 2 0 1 S",
            "1989 1989 9 1 7 2 0 0",
            "1990 1990 3 1 7 2 0 1 S",
            "1990 1990 8 30 7 2 0 0",
            "1991 1991 3 1 7 0 0 1 S",
            "1991 1992 9 1 7 0 0 0",
            "1992 1992 3 8 7 0 0 1 S",
            "1993 1993 2 26 7 0 0 1 S",
            "1993 1993 8 25 7 0 0 0",
            "1994 1996 3 1 7 0 0 1 S",
            "1994 2005 9 1 7 0 0 0",
            "1997 1998 2 1 8 0 0 1 S",
            "1999 2006 3 1 7 0 0 1 S",
            "2006 2006 8 22 7 0 0 0",
            "2007 2007 2 5 8 0 0 1 S",
            "2007 2007 10 1 5 0 0 0",
            "2008 2008 3 1 5 0 0 1 S",
            "2008 2008 10 1 7 0 0 0",
            "2009 2009 2 5 8 0 0 1 S",
            "2010 2011 3 1 5 0 0 1 S",
            "2012 9999 2 5 8 0 0 1 S",
            "2009 9999 9 5 8 0 0 0"
        ],
        "Dhaka": [
            "2009 2009 5 19 7 23 0 1 S",
            "2009 2009 11 31 7 23:59 0 0"
        ],
        "Zion": [
            "1940 1940 5 1 7 0 0 1 D",
            "1942 1944 10 1 7 0 0 0 S",
            "1943 1943 3 1 7 2 0 1 D",
            "1944 1944 3 1 7 0 0 1 D",
            "1945 1945 3 16 7 0 0 1 D",
            "1945 1945 10 1 7 2 0 0 S",
            "1946 1946 3 16 7 2 0 1 D",
            "1946 1946 10 1 7 0 0 0 S",
            "1948 1948 4 23 7 0 0 2 DD",
            "1948 1948 8 1 7 0 0 1 D",
            "1948 1949 10 1 7 2 0 0 S",
            "1949 1949 4 1 7 0 0 1 D",
            "1950 1950 3 16 7 0 0 1 D",
            "1950 1950 8 15 7 3 0 0 S",
            "1951 1951 3 1 7 0 0 1 D",
            "1951 1951 10 11 7 3 0 0 S",
            "1952 1952 3 20 7 2 0 1 D",
            "1952 1952 9 19 7 3 0 0 S",
            "1953 1953 3 12 7 2 0 1 D",
            "1953 1953 8 13 7 3 0 0 S",
            "1954 1954 5 13 7 0 0 1 D",
            "1954 1954 8 12 7 0 0 0 S",
            "1955 1955 5 11 7 2 0 1 D",
            "1955 1955 8 11 7 0 0 0 S",
            "1956 1956 5 3 7 0 0 1 D",
            "1956 1956 8 30 7 3 0 0 S",
            "1957 1957 3 29 7 2 0 1 D",
            "1957 1957 8 22 7 0 0 0 S",
            "1974 1974 6 7 7 0 0 1 D",
            "1974 1974 9 13 7 0 0 0 S",
            "1975 1975 3 20 7 0 0 1 D",
            "1975 1975 7 31 7 0 0 0 S",
            "1985 1985 3 14 7 0 0 1 D",
            "1985 1985 8 15 7 0 0 0 S",
            "1986 1986 4 18 7 0 0 1 D",
            "1986 1986 8 7 7 0 0 0 S",
            "1987 1987 3 15 7 0 0 1 D",
            "1987 1987 8 13 7 0 0 0 S",
            "1988 1988 3 9 7 0 0 1 D",
            "1988 1988 8 3 7 0 0 0 S",
            "1989 1989 3 30 7 0 0 1 D",
            "1989 1989 8 3 7 0 0 0 S",
            "1990 1990 2 25 7 0 0 1 D",
            "1990 1990 7 26 7 0 0 0 S",
            "1991 1991 2 24 7 0 0 1 D",
            "1991 1991 8 1 7 0 0 0 S",
            "1992 1992 2 29 7 0 0 1 D",
            "1992 1992 8 6 7 0 0 0 S",
            "1993 1993 3 2 7 0 0 1 D",
            "1993 1993 8 5 7 0 0 0 S",
            "1994 1994 3 1 7 0 0 1 D",
            "1994 1994 7 28 7 0 0 0 S",
            "1995 1995 2 31 7 0 0 1 D",
            "1995 1995 8 3 7 0 0 0 S",
            "1996 1996 2 15 7 0 0 1 D",
            "1996 1996 8 16 7 0 0 0 S",
            "1997 1997 2 21 7 0 0 1 D",
            "1997 1997 8 14 7 0 0 0 S",
            "1998 1998 2 20 7 0 0 1 D",
            "1998 1998 8 6 7 0 0 0 S",
            "1999 1999 3 2 7 2 0 1 D",
            "1999 1999 8 3 7 2 0 0 S",
            "2000 2000 3 14 7 2 0 1 D",
            "2000 2000 9 6 7 1 0 0 S",
            "2001 2001 3 9 7 1 0 1 D",
            "2001 2001 8 24 7 1 0 0 S",
            "2002 2002 2 29 7 1 0 1 D",
            "2002 2002 9 7 7 1 0 0 S",
            "2003 2003 2 28 7 1 0 1 D",
            "2003 2003 9 3 7 1 0 0 S",
            "2004 2004 3 7 7 1 0 1 D",
            "2004 2004 8 22 7 1 0 0 S",
            "2005 2005 3 1 7 2 0 1 D",
            "2005 2005 9 9 7 2 0 0 S",
            "2006 2010 2 26 5 2 0 1 D",
            "2006 2006 9 1 7 2 0 0 S",
            "2007 2007 8 16 7 2 0 0 S",
            "2008 2008 9 5 7 2 0 0 S",
            "2009 2009 8 27 7 2 0 0 S",
            "2010 2010 8 12 7 2 0 0 S",
            "2011 2011 3 1 7 2 0 1 D",
            "2011 2011 9 2 7 2 0 0 S",
            "2012 2012 2 26 5 2 0 1 D",
            "2012 2012 8 23 7 2 0 0 S",
            "2013 9999 2 23 5 2 0 1 D",
            "2013 2026 9 2 0 2 0 0 S",
            "2027 2027 9 3 1 2 0 0 S",
            "2028 9999 9 2 0 2 0 0 S"
        ],
        "EgyptAsia": [
            "1957 1957 4 10 7 0 0 1 S",
            "1957 1958 9 1 7 0 0 0",
            "1958 1958 4 1 7 0 0 1 S",
            "1959 1967 4 1 7 1 0 1 S",
            "1959 1965 8 30 7 3 0 0",
            "1966 1966 9 1 7 3 0 0"
        ],
        "Palestine": [
            "1999 2005 3 15 5 0 0 1 S",
            "1999 2003 9 15 5 0 0 0",
            "2004 2004 9 1 7 1 0 0",
            "2005 2005 9 4 7 2 0 0",
            "2006 2007 3 1 7 0 0 1 S",
            "2006 2006 8 22 7 0 0 0",
            "2007 2007 8 8 4 2 0 0",
            "2008 2009 2 5 8 0 0 1 S",
            "2008 2008 8 1 7 0 0 0",
            "2009 2009 8 1 5 1 0 0",
            "2010 2010 2 26 7 0 0 1 S",
            "2010 2010 7 11 7 0 0 0",
            "2011 2011 3 1 7 0:1 0 1 S",
            "2011 2011 7 1 7 0 0 0",
            "2011 2011 7 30 7 0 0 1 S",
            "2011 2011 8 30 7 0 0 0",
            "2012 9999 2 4 8 24 0 1 S",
            "2012 9999 8 21 5 1 0 0"
        ],
        "HK": [
            "1941 1941 3 1 7 3:30 0 1 S",
            "1941 1941 8 30 7 3:30 0 0",
            "1946 1946 3 20 7 3:30 0 1 S",
            "1946 1946 11 1 7 3:30 0 0",
            "1947 1947 3 13 7 3:30 0 1 S",
            "1947 1947 11 30 7 3:30 0 0",
            "1948 1948 4 2 7 3:30 0 1 S",
            "1948 1951 9 0 8 3:30 0 0",
            "1952 1952 9 25 7 3:30 0 0",
            "1949 1953 3 1 0 3:30 0 1 S",
            "1953 1953 10 1 7 3:30 0 0",
            "1954 1964 2 18 0 3:30 0 1 S",
            "1954 1954 9 31 7 3:30 0 0",
            "1955 1964 10 1 0 3:30 0 0",
            "1965 1976 3 16 0 3:30 0 1 S",
            "1965 1976 9 16 0 3:30 0 0",
            "1973 1973 11 30 7 3:30 0 1 S",
            "1979 1979 4 8 0 3:30 0 1 S",
            "1979 1979 9 16 0 3:30 0 0"
        ],
        "Pakistan": [
            "2002 2002 3 2 0 0:1 0 1 S",
            "2002 2002 9 2 0 0:1 0 0",
            "2008 2008 5 1 7 0 0 1 S",
            "2008 2008 10 1 7 0 0 0",
            "2009 2009 3 15 7 0 0 1 S",
            "2009 2009 10 1 7 0 0 0"
        ],
        "NBorneo": [
            "1935 1941 8 14 7 0 0 0:20 TS",
            "1935 1941 11 14 7 0 0 0"
        ],
        "Macau": [
            "1961 1962 2 16 0 3:30 0 1 S",
            "1961 1964 10 1 0 3:30 0 0",
            "1963 1963 2 16 0 0 0 1 S",
            "1964 1964 2 16 0 3:30 0 1 S",
            "1965 1965 2 16 0 0 0 1 S",
            "1965 1965 9 31 7 0 0 0",
            "1966 1971 3 16 0 3:30 0 1 S",
            "1966 1971 9 16 0 3:30 0 0",
            "1972 1974 3 15 0 0 0 1 S",
            "1972 1973 9 15 0 0 0 0",
            "1974 1977 9 15 0 3:30 0 0",
            "1975 1977 3 15 0 3:30 0 1 S",
            "1978 1980 3 15 0 0 0 1 S",
            "1978 1980 9 15 0 0 0 0"
        ],
        "Phil": [
            "1936 1936 10 1 7 0 0 1 S",
            "1937 1937 1 1 7 0 0 0",
            "1954 1954 3 12 7 0 0 1 S",
            "1954 1954 6 1 7 0 0 0",
            "1978 1978 2 22 7 0 0 1 S",
            "1978 1978 8 21 7 0 0 0"
        ],
        "Cyprus": [
            "1975 1975 3 13 7 0 0 1 S",
            "1975 1975 9 12 7 0 0 0",
            "1976 1976 4 15 7 0 0 1 S",
            "1976 1976 9 11 7 0 0 0",
            "1977 1980 3 1 0 0 0 1 S",
            "1977 1977 8 25 7 0 0 0",
            "1978 1978 9 2 7 0 0 0",
            "1979 1997 8 0 8 0 0 0",
            "1981 1998 2 0 8 0 0 1 S"
        ],
        "ROK": [
            "1960 1960 4 15 7 0 0 1 D",
            "1960 1960 8 13 7 0 0 0 S",
            "1987 1988 4 8 0 0 0 1 D",
            "1987 1988 9 8 0 0 0 0 S"
        ],
        "Shang": [
            "1940 1940 5 3 7 0 0 1 D",
            "1940 1941 9 1 7 0 0 0 S",
            "1941 1941 2 16 7 0 0 1 D"
        ],
        "Taiwan": [
            "1945 1951 4 1 7 0 0 1 D",
            "1945 1951 9 1 7 0 0 0 S",
            "1952 1952 2 1 7 0 0 1 D",
            "1952 1954 10 1 7 0 0 0 S",
            "1953 1959 3 1 7 0 0 1 D",
            "1955 1961 9 1 7 0 0 0 S",
            "1960 1961 5 1 7 0 0 1 D",
            "1974 1975 3 1 7 0 0 1 D",
            "1974 1975 9 1 7 0 0 0 S",
            "1979 1979 5 30 7 0 0 1 D",
            "1979 1979 8 30 7 0 0 0 S"
        ],
        "E-EurAsia": [
            "1981 9999 2 0 8 0 0 1 S",
            "1979 1995 8 0 8 0 0 0",
            "1996 9999 9 0 8 0 0 0"
        ],
        "Iran": [
            "1978 1980 2 21 7 0 0 1 D",
            "1978 1978 9 21 7 0 0 0 S",
            "1979 1979 8 19 7 0 0 0 S",
            "1980 1980 8 23 7 0 0 0 S",
            "1991 1991 4 3 7 0 0 1 D",
            "1992 1995 2 22 7 0 0 1 D",
            "1991 1995 8 22 7 0 0 0 S",
            "1996 1996 2 21 7 0 0 1 D",
            "1996 1996 8 21 7 0 0 0 S",
            "1997 1999 2 22 7 0 0 1 D",
            "1997 1999 8 22 7 0 0 0 S",
            "2000 2000 2 21 7 0 0 1 D",
            "2000 2000 8 21 7 0 0 0 S",
            "2001 2003 2 22 7 0 0 1 D",
            "2001 2003 8 22 7 0 0 0 S",
            "2004 2004 2 21 7 0 0 1 D",
            "2004 2004 8 21 7 0 0 0 S",
            "2005 2005 2 22 7 0 0 1 D",
            "2005 2005 8 22 7 0 0 0 S",
            "2008 2008 2 21 7 0 0 1 D",
            "2008 2008 8 21 7 0 0 0 S",
            "2009 2011 2 22 7 0 0 1 D",
            "2009 2011 8 22 7 0 0 0 S",
            "2012 2012 2 21 7 0 0 1 D",
            "2012 2012 8 21 7 0 0 0 S",
            "2013 2015 2 22 7 0 0 1 D",
            "2013 2015 8 22 7 0 0 0 S",
            "2016 2016 2 21 7 0 0 1 D",
            "2016 2016 8 21 7 0 0 0 S",
            "2017 2019 2 22 7 0 0 1 D",
            "2017 2019 8 22 7 0 0 0 S",
            "2020 2020 2 21 7 0 0 1 D",
            "2020 2020 8 21 7 0 0 0 S",
            "2021 2023 2 22 7 0 0 1 D",
            "2021 2023 8 22 7 0 0 0 S",
            "2024 2024 2 21 7 0 0 1 D",
            "2024 2024 8 21 7 0 0 0 S",
            "2025 2027 2 22 7 0 0 1 D",
            "2025 2027 8 22 7 0 0 0 S",
            "2028 2029 2 21 7 0 0 1 D",
            "2028 2029 8 21 7 0 0 0 S",
            "2030 2031 2 22 7 0 0 1 D",
            "2030 2031 8 22 7 0 0 0 S",
            "2032 2033 2 21 7 0 0 1 D",
            "2032 2033 8 21 7 0 0 0 S",
            "2034 2035 2 22 7 0 0 1 D",
            "2034 2035 8 22 7 0 0 0 S",
            "2036 2037 2 21 7 0 0 1 D",
            "2036 2037 8 21 7 0 0 0 S"
        ],
        "Japan": [
            "1948 1948 4 1 0 2 0 1 D",
            "1948 1951 8 8 6 2 0 0 S",
            "1949 1949 3 1 0 2 0 1 D",
            "1950 1951 4 1 0 2 0 1 D"
        ]
    },
    "links": {
        "America/Kralendijk": "America/Curacao",
        "America/Lower_Princes": "America/Curacao",
        "America/Marigot": "America/Guadeloupe",
        "America/Shiprock": "America/Denver",
        "America/St_Barthelemy": "America/Guadeloupe"
    }
});
