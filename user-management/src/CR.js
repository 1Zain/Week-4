import React, { useState, useEffect } from 'react';

const CRApp = () => {
  // State for users data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for form inputs
  const [nameInput, setNameInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');



  // API URL
  const API_URL = "https://68a04cea6e38a02c58184c4b.mockapi.io/users/users";

  // ===== CRUD OPERATION 1: GET (Read) =====
  // useEffect to fetch users when component mounts
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    console.log("Getting users from API...");
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const usersData = await response.json();
      console.log("Users received:", usersData);
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // ===== CRUD OPERATION 2: POST (Create) =====
  const createUser = async () => {
    console.log("Creating new user...");
    
    const name = nameInput.trim();
    const avatar = avatarInput.trim();
    
    if (!name || !avatar) {
      alert("Please fill in both name and avatar fields!");
      return;
    }
    
    console.log("Sending data:", { name, avatar });
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          name: name, 
          avatar: avatar 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      console.log("User created successfully!");
      
      // Clear the input fields
      setNameInput("");
      setAvatarInput("");
      
      // Refresh the users list
      getUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user: " + err.message);
    }
  };



  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading users...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        Error: {error}
        <br />
        <button onClick={getUsers}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Users Management</h1>

      {/* Form Container */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px', 
        justifyContent: 'center', 
        flexWrap: 'wrap' 
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Name"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minWidth: '200px'
            }}
          />
          <input
            type="text"
            value={avatarInput}
            onChange={(e) => setAvatarInput(e.target.value)}
            placeholder="Avatar URL"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minWidth: '200px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              border: 'none',
              background: '#007bff',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        background: '#fff',
        border: '1px solid #ddd'
      }}>
        <thead>
          <tr>
            <th style={{ 
              border: '1px solid #ddd', 
              padding: '10px', 
              textAlign: 'left',
              background: '#007bff',
              color: '#fff'
            }}>ID</th>
            <th style={{ 
              border: '1px solid #ddd', 
              padding: '10px', 
              textAlign: 'left',
              background: '#007bff',
              color: '#fff'
            }}>Avatar</th>
            <th style={{ 
              border: '1px solid #ddd', 
              padding: '10px', 
              textAlign: 'left',
              background: '#007bff',
              color: '#fff'
            }}>Name</th>
            <th style={{ 
              border: '1px solid #ddd', 
              padding: '10px', 
              textAlign: 'left',
              background: '#007bff',
              color: '#fff'
            }}>Created At</th>

          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                <img 
                  src={user.avatar} 
                  alt="avatar" 
                  style={{ 
                    width: '50px', 
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                {user.name}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                {new Date(user.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          No users found. Add your first user above!
        </div>
      )}
    </div>
  );
};

export default CRApp;
