import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { treeName } from "../services/api";

const TreeNode = ({
  node,
  handleOpenModal,
  selectedNodeId,
  handleNodeSelect,
  openDropdown,
  toggleDropdown,
}) => {
  const isSelected = selectedNodeId === node.id;
  const isOpen = openDropdown[node.id];
  const hasChildren = node.children.length > 0;

  return (
    <li style={{ listStyleType: "none" }}>
      <Box
        onClick={() => {
          handleNodeSelect(node.id);
          toggleDropdown(node.id);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          backgroundColor: isSelected ? "#e0f7fa" : "transparent",
          cursor: "pointer",
          height: "100%",
          minHeight: "40px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            cursor: hasChildren ? "pointer" : "default",
          }}
        >
          {hasChildren && (
            <ArrowDropDownIcon
              sx={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
            />
          )}
          {node.name}
        </span>
        {isSelected && node.name !== treeName && (
          <>
            <AddCircleOutlineIcon
              color="primary"
              onClick={() => handleOpenModal("create", node)}
              sx={{ cursor: "pointer" }}
            />
            <EditIcon
              color="primary"
              onClick={() => handleOpenModal("rename", node)}
              sx={{ cursor: "pointer" }}
            />
            <DeleteForeverIcon
              color="error"
              onClick={() => handleOpenModal("delete", node)}
              sx={{ cursor: "pointer" }}
            />
          </>
        )}
        {node.name === treeName && (
          <AddCircleOutlineIcon
            color="primary"
            onClick={() => handleOpenModal("create", node)}
            sx={{ cursor: "pointer" }}
          />
        )}
      </Box>
      {hasChildren && isOpen && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              handleOpenModal={handleOpenModal}
              selectedNodeId={selectedNodeId}
              handleNodeSelect={handleNodeSelect}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
