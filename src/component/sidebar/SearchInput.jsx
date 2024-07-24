import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { toast } from "react-toastify";
import { TextField, IconButton } from '@mui/material';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      console.log(conversation);
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TextField
        variant="outlined"
        placeholder="Search…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
      <IconButton type="submit" color="primary">
        <IoSearchSharp />
      </IconButton>
    </form>
  );
};

export default SearchInput;
