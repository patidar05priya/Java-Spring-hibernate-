package com.inn.headstartdemo.model;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import java.io.Serializable;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.hibernate.envers.Audited;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import com.inn.headstartdemo.utils.BaseEntity;
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.validator.constraints.Length;

/**
 * Auto-generated by:
 * org.apache.openjpa.jdbc.meta.ReverseMappingTool$AnnotatedCodeGenerator
 */
@XmlRootElement(name="Employee") @JsonIgnoreProperties(value={"hibernateLazyInitializer","handler"}) @Audited @Entity
@Table(name="employee")
public class Employee extends BaseEntity implements Serializable {
	@Length(min=0, max=100) @Basic
	@Column(nullable=false, length=100)
	private String email;

	@GeneratedValue(strategy=javax.persistence.GenerationType.AUTO) @Id
	@Column(columnDefinition="INT")
	private Integer employeeNumber;

	@Length(min=0, max=10) @Basic
	@Column(nullable=false, length=10)
	private String extension;

	@Length(min=0, max=50) @Basic
	@Column(nullable=false, length=50)
	private String firstName;

	@Length(min=0, max=50) @Basic
	@Column(nullable=false, length=50)
	private String jobTitle;

	@Length(min=0, max=50) @Basic
	@Column(nullable=false, length=50)
	private String lastName;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="officeid", columnDefinition="INT", nullable=false)
	private Office office;

	@Basic
	@Column(columnDefinition="INT")
	private Integer reportsTo;


	public Employee() {
	}

	public Employee(Integer employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getEmployeeNumber() {
		return employeeNumber;
	}

	public void setEmployeeNumber(Integer employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}

	public Integer getReportsTo() {
		return reportsTo;
	}

	public void setReportsTo(Integer reportsTo) {
		this.reportsTo = reportsTo;
	}

	public boolean equals(Object obj) {
		boolean returnValue = false;
		if (obj instanceof Employee) {
			Employee employee = (Employee) obj;
			EqualsBuilder equalsBuilder = new EqualsBuilder();
			equalsBuilder.append(email, employee.getEmail());
			equalsBuilder.append(employeeNumber, employee.getEmployeeNumber());
			equalsBuilder.append(extension, employee.getExtension());
			equalsBuilder.append(firstName, employee.getFirstName());
			equalsBuilder.append(jobTitle, employee.getJobTitle());
			equalsBuilder.append(lastName, employee.getLastName());
			equalsBuilder.append(office, employee.getOffice());
			equalsBuilder.append(reportsTo, employee.getReportsTo());
			returnValue = equalsBuilder.isEquals();
		}
		return returnValue;
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public int hashCode() {
		HashCodeBuilder hashCodeBuilder = new HashCodeBuilder(17, 37);
		hashCodeBuilder.append(email);
		hashCodeBuilder.append(employeeNumber);
		hashCodeBuilder.append(extension);
		hashCodeBuilder.append(firstName);
		hashCodeBuilder.append(jobTitle);
		hashCodeBuilder.append(lastName);
		hashCodeBuilder.append(office);
		hashCodeBuilder.append(reportsTo);
		return hashCodeBuilder.toHashCode();
	}

	@org.codehaus.jackson.annotate.JsonIgnore
	public String getPrimaryKeyIdentifier() {
		return employeeNumber.toString();
	}
}