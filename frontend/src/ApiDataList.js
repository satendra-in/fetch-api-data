import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ApiDataList = ({ dataList, fetchData }) => {

    const [commentInput, setCommentInput] = useState('');
    const [newComments, setNewComments] = useState({});

    const deleteData = async (id) => {
        try {
            console.log('to be deleted: ' + id);
            await axios.delete(`http://localhost:5000/api/data/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const postComment = async (id, comment) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/data/${id}/comments`, { comment });
            setNewComments({ ...newComments, [id]: response.data.comment });
            setCommentInput('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const renderApiData = dataList.map((data, index) => {
        return (
            <div className="item" key={index}>
                <div className="content">
                    <div className="header"> login: {data.login}</div>
                    <div>Created_at: {data.created_at}</div>
                    <div>Updated_at: {data.updated_at}</div>
                    <br/>
                    <div>Comments:</div>
                    <div>
                        {newComments[data._id] && (
                            <div className="comment">{newComments[data._id]}</div>
                        )}
                    </div>
                    <div className="field">
                        <input
                            type="text"
                            name="comment"
                            placeholder="Write your comment..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <button
                            className="ui button blue"
                            onClick={() => postComment(data._id, commentInput)}
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
                <i
                    className="trash alternate outline icon"
                    style={{ color: 'red', cursor: 'pointer', alignSelf: 'flex-end' }}
                    onClick={() => deleteData(data._id)} // Assuming MongoDB uses _id as the primary key
                ></i>
            </div>
        );
    });

    return <div className="ui celled list">{renderApiData}</div>;
};

export default ApiDataList;
