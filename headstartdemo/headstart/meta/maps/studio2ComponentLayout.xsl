<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:param name="layoutXMLToMerge"/>
	
	<xsl:output method="xml" indent="yes" name="xml"/>

	<xsl:variable name="tabName" select="document($layoutXMLToMerge)//title/text()"/>

	<xsl:template match="/Component">
		<Component name="{@name}" type="{@type}">
			<xsl:apply-templates select="/Component/attributes"/>
			<xsl:apply-templates select="/Component/ComponentContainer"/>
		</Component>
	</xsl:template>

	<xsl:template match="/Component/ComponentContainer">
		<ComponentContainer>
			<xsl:for-each select="Component">
				<xsl:choose>
					<xsl:when test="attributes/attr[@name='id' and text()=$tabName]"/>
					<xsl:otherwise>
						<xsl:apply-templates select="*"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>			
			
			<Component name="{$tabName}" type="Page">
				<attributes>
					<attr name="id">
						<xsl:value-of select="$tabName"/>
					</attr>
					<attr name="title">
						<xsl:value-of select="substring-before($tabName,'tab')"/>
					</attr>
					<attr name="additionalInfo1">entitytab</attr>
					<attr name="parentRelationType">included</attr>
				</attributes>
				<ComponentContainer>
					<xsl:for-each select="document($layoutXMLToMerge)//area/component">
						<Component>
							<xsl:attribute name="ref">
								<xsl:value-of select="concat(@name,'.xml')"/>
							</xsl:attribute>
						</Component>
					</xsl:for-each>
				</ComponentContainer>
			</Component>
		</ComponentContainer>
	</xsl:template>

	<xsl:template match="*|@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|node()"/>
		</xsl:copy>
	</xsl:template>

</xsl:stylesheet>
