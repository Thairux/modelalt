import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recipient, setRecipient] = useState('');
    const [conversations, setConversations] = useState({});

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('/api/messages'); // Adjust if needed
                setConversations(response.data); // Expecting an object keyed by usernames
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/messages/send', { recipient, content: newMessage });
            setNewMessage('');
            // Refresh messages after sending
            const response = await axios.get('/api/messages');
            setConversations(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>Messages</h2>
            <div>
                <h3>Conversations</h3>
                {Object.keys(conversations).map((user) => (
                    <div key={user}>
                        <h4>{user}</h4>
                        <ul>
                            {conversations[user].map((msg, index) => (
                                <li key={index}>{msg.content}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    placeholder="Recipient username" 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type your message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Messaging;