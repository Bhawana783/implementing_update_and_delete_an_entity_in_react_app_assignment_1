import { useState } from "react";
import axios from "axios";

const UpdateItem = ({ item }) => {
    // 1. Create a state for the form
    const [formData, setFormData] = useState({ name: item?.name || "" });
    const [message, setMessage] = useState("");

    // 2. Create a function to handle the form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Create a function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://example.com/api/items/${item.id}`, formData);
            setMessage("Item updated successfully!");
            console.log("Updated item:", response.data);
        } catch (error) {
            console.error("Error updating item:", error);
            setMessage("Failed to update item.");
        }
    };

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                </label>
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateItem;

