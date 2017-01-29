<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<view>
			<xsl:attribute name="type">
				<xsl:choose>
					<xsl:when test="Component/@type = 'Form'">edit</xsl:when>
					<xsl:when test="Component/@type = 'Grid'">list</xsl:when>
					<xsl:when test="Component/@type = 'DataSource'">edit</xsl:when>
					<xsl:otherwise></xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<datasource>
				<xsl:attribute name="type">orm</xsl:attribute>
				<class>filmpeer</class>
				<method>
					<xsl:attribute name="name">retrieveByPk</xsl:attribute>
					<param>
						<xsl:attribute name="name">id</xsl:attribute>
						<xsl:value-of select="'{id}'"/>
					</param>
				</method>
			</datasource>
			<fields>
				<xsl:attribute name="remoteFilter">false</xsl:attribute>
				<xsl:attribute name="remoteSort">false</xsl:attribute>
				<xsl:choose>
					<xsl:when test="Component/@type = 'DataSource'">
						<xsl:for-each select="Component/ComponentContainer/Component">
							<xsl:for-each select="attributes">
								<xsl:if test=".//attr[@name = 'type'] != 'button'">
									<field>
										<xsl:variable name="name" select="attr[@name ='name']"/>
										<xsl:variable name="label" select="attr[@name = 'title']"/>

										<xsl:attribute name="name">
											<xsl:value-of select="$name"/>
										</xsl:attribute>

										<xsl:attribute name="label">
											<xsl:choose>
												<xsl:when test="$label != ''">
													<xsl:value-of select="$label"/>
												</xsl:when>
												<xsl:otherwise>
													<xsl:value-of select="$name"/>
												</xsl:otherwise>
											</xsl:choose>
										</xsl:attribute>
									</field>
								</xsl:if>
							</xsl:for-each>
						</xsl:for-each>
					</xsl:when>
					<xsl:otherwise></xsl:otherwise>
				</xsl:choose>
			</fields>
			<title>
				<xsl:value-of select="Component/attributes/attr[@name='id']"/>
			</title>
		</view>
	</xsl:template>

	<xsl:template name="formGrid">
		
	</xsl:template>
</xsl:stylesheet>
