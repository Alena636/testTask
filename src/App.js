import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Modal from "./components/Modal";
import TreeNode from "./components/TreeNode";
import { useTreeData } from "./hooks/useTreeData";

const App = () => {
  const { treeData, getTree, createNode, deleteNode, renameNode } = useTreeData();
  const [modalType, setModalType] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState({});
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getTree();
  }, [getTree]);

  const handleOpenModal = (type, node = null) => {
    setModalType(type);
    setSelectedNode(node);
    setName("");
    setNewName("");
    setErrorMessage("");
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedNode(null);
    setName("");
    setNewName("");
    setErrorMessage("");
  };

  const handleSubmitModal = async () => {
    try {
      if (modalType === "create") {
        await createNode(selectedNode?.id, name);
      } else if (modalType === "delete") {
        await deleteNode(selectedNode?.id);
      } else if (modalType === "rename") {
        await renameNode(selectedNode?.id, newName);
      }
      handleCloseModal();
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred");
    }
  };

  const toggleDropdown = (nodeId) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [nodeId]: !prevState[nodeId],
    }));
  };

  const modalConfig = {
    create: {
      title: "Add Node",
      inputs: [
        {
          name: "name",
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: "Enter node name",
        },
      ],
      submitText: "Add",
    },
    rename: {
      title: "Rename",
      inputs: [
        {
          name: "newName",
          value: newName,
          onChange: (e) => setNewName(e.target.value),
          placeholder: "New node name",
        },
      ],
      submitText: "Rename",
    },
    delete: {
      title: "Delete",
      description: `Do you want to delete the node "${selectedNode?.name}"?`,
      inputs: [],
      submitText: "Delete",
    },
  };

  return (
    <Box>
      {treeData ? (
        <ul>
          <TreeNode
            node={treeData}
            handleOpenModal={handleOpenModal}
            selectedNodeId={selectedNodeId}
            handleNodeSelect={setSelectedNodeId}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
          />
        </ul>
      ) : (
        <p>Loading tree data...</p>
      )}
      <Modal
        open={!!modalType}
        onClose={handleCloseModal}
        config={{ ...modalConfig[modalType], errorMessage }}
        onSubmit={handleSubmitModal}
      />
    </Box>
  );
};

export default App;

