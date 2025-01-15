const baseUrl = "https://test.vmarmysh.com";
export const treeName = "Root";

export const fetchTree = async () => {
  const response = await fetch(
    `${baseUrl}/api.user.tree.get?treeName=${treeName}`,
    { method: "POST" }
  );
  return response.json();
};

export const createNodeApi = async (parentNodeId, nodeName) => {
  const response = await fetch(
    `${baseUrl}/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,
    { method: "POST" }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.data.message);
  }
};

export const deleteNodeApi = async (nodeId) => {
  const response = await fetch(
    `${baseUrl}/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.data.message);
  }
};

export const renameNodeApi = async (nodeId, newNodeName) => {
  const response = await fetch(
    `${baseUrl}/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`,
    { method: "POST" }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.data.message);
  }
};
