package com.inn.headstartdemo.audit;


/**
 * Auditable action (which CRUD)
 **/

public enum AuditActionType
{
	CREATE("CREATE", AuditType.WRITE), 
	FIND("FIND", AuditType.READ), 
	READ("READ", AuditType.READ), 
	UPDATE("UPDATE", AuditType.WRITE), 
	DELETE("DELETE", AuditType.WRITE),
	LOGIN("LOGIN", AuditType.READ),
	LOGOUT("LOGOUT", AuditType.READ);

	private String value;
	private AuditType auditType;

	AuditActionType(String value, AuditType auditType)
	{
		this.value = value;
		this.auditType = auditType;
	}

	public String getValue()
	{
		return value;
	}

	/**
	 * @return the auditType
	 */
	public AuditType getAuditType()
	{
		return auditType;
	}
}



