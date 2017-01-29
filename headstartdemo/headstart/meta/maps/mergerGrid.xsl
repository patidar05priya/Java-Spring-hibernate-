<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:app="http://www.appflower.com/schema/" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="mergeGrid">
		<xsl:param name="column"/>
		<xsl:param name="title"/>
		<xsl:variable name="colName" select="$column/@name"/>
		<xsl:variable name="docLocation" select="concat(concat('../components/', $title), '.xml')"/>

		<xsl:choose>
			<xsl:when test="boolean(document($docLocation)) &gt; 0">
				<xsl:for-each select="document($docLocation)/Component/ComponentContainer/Component">
					<xsl:if test="attributes/attr[@name='name'] = $colName and @type = 'Field'">
						<Component type="Field">
							<attributes>
								<xsl:for-each select="attributes/attr">
									<xsl:choose>
										<xsl:when test="@name = 'title'">
											<xsl:element name="attr">
												<xsl:attribute name="name">
													<xsl:value-of select="'title'"/>
												</xsl:attribute>
												<xsl:value-of select="$column/@label"/>
											</xsl:element>
										</xsl:when>
										<xsl:otherwise>
											<xsl:apply-templates select="."/>
										</xsl:otherwise>
									</xsl:choose>
								</xsl:for-each>
							</attributes>
						</Component>
					</xsl:if>
					<xsl:if test="@type != 'Field'">
						<xsl:apply-templates/>
					</xsl:if>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<Component type="Field">
					<attributes>
						<attr name="name">
							<xsl:value-of select="$colName"/>
						</attr>
						<xsl:if test="$column/type != ''">
							<attr name="type">
								<xsl:value-of select="$column/type"/>
							</attr>
						</xsl:if>
					</attributes>
				</Component>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
