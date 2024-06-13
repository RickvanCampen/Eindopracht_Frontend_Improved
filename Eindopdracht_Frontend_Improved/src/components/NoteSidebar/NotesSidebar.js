import React, { useState } from "react";


const NoteItem = ({ note, onDeleteNote }) => {
    const noteWidth = 350;
    const noteContainerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: noteWidth,
        padding: "5px 10px",
        borderRadius: "5px",
        marginBottom: "10px",
        backgroundColor: "#f0f0f0"
    };
    const noteTextStyle = {
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        maxWidth: noteWidth,
        minWidth: noteWidth,
        textAlign: "left",
        marginLeft: "10px",
        marginRight: "10px"
    };

    const firstWord = note.split(' ')[0];

    return (
        <div style={noteContainerStyle}>
            <div style={{ color: "#0df541" }}>
                •
            </div>
            <div style={noteTextStyle}>
                <div style={{ display: "inline" }}>{firstWord}</div> {note.slice(firstWord.length)}
            </div>
            <button onClick={onDeleteNote} style={{ backgroundColor: "#0df541", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", fontSize: "15px", transition: "background-color 0.3s" }}>
                Verwijder
            </button>
        </div>
    );
};

const NotesSidebar = () => {
    // State voor huidige notitie en alle notities
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);

    // Functie om een nieuwe notitie toe te voegen
    const handleAddNote = () => {
        if (note.trim() !== "") {
            setNotes([...notes, note]);
            setNote("");
        }
    };

    // Functie om een notitie te verwijderen op basis van index
    const handleDeleteNote = (index) => {
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    backgroundColor: "#f0f0f0",
                    padding: "20px"
                }}
            >
                <div style={{ marginBottom: "20px" }}>
                    {/* Header voor notities */}
                    <h2 style={{ marginRight: "400px", marginLeft: "6px" }}>
                        Notities
                    </h2>
                    {/* Textarea voor het toevoegen van nieuwe notities */}
                    <div
                        style={{
                            position: "relative",
                            overflow: "auto",
                            marginBottom: "10px",
                            marginLeft: "6px"
                        }}
                    >
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Voeg hier een nieuwe notitie toe"
                            style={{ width: "100%", overflowX: "hidden", border: "2px solid #0df541", borderRadius: "5px", padding: "5px" }}
                        />
                    </div>
                    {/* Knop om een notitie toe te voegen */}
                    <button
                        onClick={handleAddNote}
                        style={{
                            marginLeft: "6px",
                            backgroundColor: "#0df541",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            fontSize: "15px",
                            transition: "background-color 0.3s"
                        }}
                    >
                        Voeg toe
                    </button>
                </div>
                <div style={{ overflowY: "auto" }}>
                    {/* Header voor weergave van notities */}
                    <h2 style={{ marginRight: "100px", marginLeft: "6px" }}>
                        Weergeven notities
                    </h2>
                    {/* Lijst met weergegeven notities */}
                    <div style={{ paddingLeft: "0", marginLeft: "6px" }}>
                        {notes.map((note, index) => (
                            <NoteItem
                                key={index}
                                note={note}
                                onDeleteNote={() => handleDeleteNote(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotesSidebar;

