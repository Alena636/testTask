import { useState, useCallback } from "react";
import { fetchTree, createNodeApi, deleteNodeApi, renameNodeApi } from "../services/api";

export const useTreeData = () => {
  const [treeData, setTreeData] = useState(null);

  const getTree = useCallback(async () => {
    const data = await fetchTree();
    setTreeData(data);
  }, []);

  const createNode = async (parentNodeId, nodeName) => {
    await createNodeApi(parentNodeId, nodeName);
    getTree();
  };

  const deleteNode = async (nodeId) => {
    await deleteNodeApi(nodeId);
    getTree();
  };

  const renameNode = async (nodeId, newNodeName) => {
    await renameNodeApi(nodeId, newNodeName);
    getTree();
  };

  return { treeData, getTree, createNode, deleteNode, renameNode };
};
