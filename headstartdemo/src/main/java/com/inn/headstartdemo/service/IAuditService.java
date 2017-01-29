/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

package com.inn.headstartdemo.service;

import java.text.ParseException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;



import com.inn.headstartdemo.exceptions.ValueNotFoundException;
import com.inn.headstartdemo.model.Audit;
import com.inn.headstartdemo.service.generic.IGenericService;

public interface IAuditService extends IGenericService<Long, Audit> 
{
	/**
	 * Persist audit
	 * @param audit
	 */
	public void doAudit(Audit audit);
	public List<Audit> auditSearch(JSONObject criteria) throws  JSONException, ParseException,  ValueNotFoundException;
	public List<Audit> getLoggedInUsers()throws  ValueNotFoundException;
	public Long getTotalCount();

}
