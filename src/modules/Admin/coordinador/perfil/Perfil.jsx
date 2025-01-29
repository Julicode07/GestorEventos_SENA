import { useState } from 'react';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);

    const [email, setEmail] = useState('fndkjsnkfj');
    const [phone, setPhone] = useState('fjkdskjf');
    const [doc, setDoc] = useState('fjdshkjf');

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <main>
            <section className="flex flex-col items-center gap-2 py-1">
                <div className="bg-primary text-white rounded-full p-2 w-32 h-32 flex items-center justify-center shadow-lg">
                    <i className="ri-user-fill text-6xl"></i>
                </div>

                <h1 className="text-3xl font-semibold text-gray-800">Julian Restrepo</h1>
                <p className="text-gray-600 text-lg italic">Administrador</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full max-w-4xl px-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
                        <p className="text-gray-500 text-sm">Email</p>
                        <div className="transition-all">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                                />
                            ) : (
                                <p className="text-gray-700 font-semibold">{email}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
                        <p className="text-gray-500 text-sm">Teléfono</p>
                        <div className="transition-all">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                                />
                            ) : (
                                <p className="text-gray-700 font-semibold">{phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
                        <p className="text-gray-500 text-sm">Documento</p>
                        <div className="transition-all">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={doc}
                                    onChange={(e) => setDoc(e.target.value)}
                                    className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                                />
                            ) : (
                                <p className="text-gray-700 font-semibold">{doc}</p>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleEdit}
                    className="bg-primary/90 text-white py-2 px-6 rounded-lg mt-4 transition-colors hover:bg-primary ease-in-out duration-300"
                >
                    {isEditing ? 'Guardar cambios' : 'Editar'}
                </button>
            </section>
        </main>
    );
}

export default Profile;
