<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:app="http://www.appflower.com/schema/" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="mergerGrid.xsl"/>
	<xsl:import href="mergerForm.xsl"/>
	<xsl:template match="/app:view">

		<xsl:variable name="title" select="app:title"/>
		<xsl:variable name="type" select="@type"/>
		<xsl:variable name="docLocation" select="concat(concat('../components/', $title), '.xml')"/>
		

		<xsl:choose>
			<xsl:when test="$type = 'list'">
				<Component type="Grid">
					<xsl:choose>
						<xsl:when test="boolean(document($docLocation)) &gt; 0">
							<xsl:apply-templates select="document($docLocation)/Component/attributes"/>
						</xsl:when>
						<xsl:otherwise>
							<attributes>
							    <attr name="id">
								<xsl:value-of select="$title"/>
							    </attr>
							    <attr name="parentRelationType">ref_by_parent</attr>
							  </attributes>
						</xsl:otherwise>
					</xsl:choose>
					<ComponentContainer>
						<xsl:for-each select="app:fields/app:column">
							<xsl:call-template name="mergeGrid">
								<xsl:with-param name="column" select="."/>
								<xsl:with-param name="title" select="$title"/>
							</xsl:call-template>
						</xsl:for-each>
					</ComponentContainer>
				</Component>
			</xsl:when>
			<xsl:when test="$type = 'edit'">
				<Component type="Form">
					<xsl:choose>
						<xsl:when test="boolean(document($docLocation)) &gt; 0">
							<xsl:apply-templates select="document($docLocation)/Component/attributes"/>
						</xsl:when>
						<xsl:otherwise>
							<attributes>
							    <attr name="id">
								<xsl:value-of select="$title"/>
							    </attr>
							    <attr name="parentRelationType">ref_by_parent</attr>
							  </attributes>
						</xsl:otherwise>
					</xsl:choose>
					<ComponentContainer>
						<xsl:for-each select="app:fields/app:field">
							<xsl:call-template name="mergeForm">
								<xsl:with-param name="field" select="."/>
								<xsl:with-param name="title" select="$title"/>
							</xsl:call-template>
						</xsl:for-each>
						<xsl:call-template name="showUnProcessedElements">
							<xsl:with-param name="title" select="$title"/>
						</xsl:call-template>
					</ComponentContainer>
				</Component>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="*|@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|node()"/>
		</xsl:copy>
	</xsl:template>

	<xsl:template match="ComponentContainer"/>
	<xsl:template name="showUnProcessedElements">
		<xsl:param name="title"/>		
		<xsl:variable name="docLocation" select="concat(concat('../components/', $title), '.xml')"/>

		<xsl:if test="boolean(document($docLocation)) &gt; 0">
			<xsl:for-each select="document($docLocation)/Component/ComponentContainer/Component[@type = 'Field']">
				<xsl:if test="attributes//attr[@name = 'type'] = 'button'">
					<xsl:apply-templates select="."/>
				</xsl:if>
			</xsl:for-each>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>