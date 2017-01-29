<?xml version='1.0'?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:param name="targetDir"/>
<xsl:output method="text"/>
<xsl:output method="xml" indent="yes" name="xml"/>

<xsl:template match="/">
	<xsl:for-each select="Component/ComponentContainer/Component">
		<xsl:variable name="layOutFileName" select="concat('',attributes/attr[@name='id'],'.xml')" />
		<xsl:result-document href="file:////home/innoeye/apache-tomcat-7.0.59/webapps/REPO/headstartdemo/headstartdemo/1.0/headstartdemo/{$targetDir}/{$layOutFileName}" format="xml">
			<page>
				<content type="layout" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.appflower.com/schema/appflower.xsd" xmlns:i="http://www.appflower.com/schema/">
					<title>
						<xsl:value-of select="attributes/attr[@name = 'id']/text()"/>
					</title>
					<area type="content" layout="1">						
					</area>
				</content>
				<success>true</success>
			</page>
		</xsl:result-document>
	</xsl:for-each>
	
</xsl:template>

</xsl:stylesheet>