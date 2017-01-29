package com.inn.headstartdemo.model;

import java.util.*;
import javax.persistence.*;
import javax.persistence.GeneratedValue;
import java.io.Serializable;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.Audited;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import com.inn.headstartdemo.utils.BaseEntity;
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.validator.constraints.Length;

/**
 * Auto-generated by:
 * org.apache.openjpa.jdbc.meta.ReverseMappingTool$AnnotatedCodeGenerator
 */
@XmlRootElement(name="Orders") @JsonIgnoreProperties(value={"hibernateLazyInitializer","handler"}) @Audited @Entity
@Table(name="orders")
public class Orders extends BaseEntity implements Serializable {
	@NotAudited @Basic
	private String comments;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="customerid", columnDefinition="INT UNSIGNED", nullable=false)
	private Customer customer;

	@Basic
	@Column(name="order_date", nullable=false)
	private Date orderDate;

	@GeneratedValue(strategy=javax.persistence.GenerationType.AUTO) @Id
	@Column(columnDefinition="INT")
	private Integer orderNumber;

	@Length(min=0, max=15) @Basic
	@Column(name="order_status", nullable=false, length=15)
	private String orderStatus;

	@Basic
	@Column(nullable=false)
	private Date requiredDate;

	@Basic
	private Date shippedDate;

	@Basic
	private Double totalCost;


	public Orders() {
	}

	public Orders(Integer orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Integer getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(Integer orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Date getRequiredDate() {
		return requiredDate;
	}

	public void setRequiredDate(Date requiredDate) {
		this.requiredDate = requiredDate;
	}

	public Date getShippedDate() {
		return shippedDate;
	}

	public void setShippedDate(Date shippedDate) {
		this.shippedDate = shippedDate;
	}

	public Double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(Double totalCost) {
		this.totalCost = totalCost;
	}

	public boolean equals(Object obj) {
		boolean returnValue = false;
		if (obj instanceof Orders) {
			Orders orders = (Orders) obj;
			EqualsBuilder equalsBuilder = new EqualsBuilder();
			equalsBuilder.append(comments, orders.getComments());
			equalsBuilder.append(customer, orders.getCustomer());
			equalsBuilder.append(orderDate, orders.getOrderDate());
			equalsBuilder.append(orderNumber, orders.getOrderNumber());
			equalsBuilder.append(orderStatus, orders.getOrderStatus());
			equalsBuilder.append(requiredDate, orders.getRequiredDate());
			equalsBuilder.append(shippedDate, orders.getShippedDate());
			equalsBuilder.append(totalCost, orders.getTotalCost());
			returnValue = equalsBuilder.isEquals();
		}
		return returnValue;
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public int hashCode() {
		HashCodeBuilder hashCodeBuilder = new HashCodeBuilder(17, 37);
		hashCodeBuilder.append(comments);
		hashCodeBuilder.append(customer);
		hashCodeBuilder.append(orderDate);
		hashCodeBuilder.append(orderNumber);
		hashCodeBuilder.append(orderStatus);
		hashCodeBuilder.append(requiredDate);
		hashCodeBuilder.append(shippedDate);
		hashCodeBuilder.append(totalCost);
		return hashCodeBuilder.toHashCode();
	}

	@org.codehaus.jackson.annotate.JsonIgnore
	public String getPrimaryKeyIdentifier() {
		return orderNumber.toString();
	}
}