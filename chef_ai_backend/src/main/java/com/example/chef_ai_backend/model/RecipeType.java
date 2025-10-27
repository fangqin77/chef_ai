package com.example.chef_ai_backend.model;

public class RecipeType {
    private Integer nodeId;         // 节点ID
    private String ftype;           // 类型标识
    private String typeName;        // 类型名称
    private Integer parentNode;     // 父节点（根节点为0或null）
    private Integer sortOrder;      // 顺序

    // getter和setter方法
    public Integer getNodeId() { return nodeId; }
    public void setNodeId(Integer nodeId) { this.nodeId = nodeId; }

    public String getFtype() { return ftype; }
    public void setFtype(String ftype) { this.ftype = ftype; }

    public String getTypeName() { return typeName; }
    public void setTypeName(String typeName) { this.typeName = typeName; }

    public Integer getParentNode() { return parentNode; }
    public void setParentNode(Integer parentNode) { this.parentNode = parentNode; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}