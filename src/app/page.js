"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savednotes = localStorage.getItem("notes");
    if (savednotes) {
      setNotes(JSON.parse(savednotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);

  const [showModal, setShowModal] = useState(false);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEdit = (note) => {
    setJudul(note.judul);
    setIsi(note.isi);
    setSelectedId(note.id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus catatan ini?");
    if (!confirmed) {
      return;
    }

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const simpanAnonimArrowFunction = (e) => {
    e.preventDefault();

    if (!judul || !isi) {
      alert("Judul dan isi wajib diisi!");
      return;
    }

    if (isEdit) {
      const updatedNotes = notes.map((note)=>
        note.id === selectedId ? {
          ...note,
          judul,
          isi
        } : note
      );

      setNotes(updatedNotes);

    } else {
      const newNotes = {
        id: Date.now(),
        judul,
        isi,
      }
      
      setNotes([...notes, newNotes]);
    }


  }

  const simpanExpressionFunction = function () {

  }



  function simpanDeclarative() {

  }

  const resetForm = () => {
    setJudul("");
    setIsi("");
    setSelectedId(null);
    setIsEdit(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-400 via-blue-200 to-yellow-100 p-6 text-black">
      <h1 className="text-center text-3xl text-blue-800">
        Aplikasi Notes
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative p-4 rounded-2xl bg-green-200 shadow hover:shadow-lg transition"
          >
            <div className="absolute top-3 right-3 flex items-center gap-2">

              <button
                onClick={() => handleEdit(note)}
                className="w-7 h-7 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:bg-yellow-500 transition"
              >
                ✏
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>

            <h3 className="font-semibold text-lg pr-16">
              {note.judul}
            </h3>

            <p className="text-sm opacity-70 mt-2">
              {note.isi}
            </p>
          </div>
        ))}
      </div>

      {/* Button tambah */}
      <button
        onClick={() => {
          resetForm();
          setShowModal(true)
        }}
        className="fixed bottom-6 right-6 bg-pink-500 text-white w-14 h-14 rounded-full text-2xl shadow-lg"
      >
        +
      </button>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
            <h2 className="mb-4 font-semibold text-lg">
              {isEdit ? "Edit Note" : "Note Baru"}
            </h2>

            <form onSubmit={simpanAnonimArrowFunction}>
              <input
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full p-2 mb-3 border rounded"
                placeholder="Judul"
              />

              <textarea
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Isi catatan..."
              />

              {/* Tombol */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 p-2 text-white bg-pink-500 rounded hover:bg-pink-600"
                >
                  {isEdit ? "Update" : "Save"}
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="flex-1 p-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </main>
  );
}


