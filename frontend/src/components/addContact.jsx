import { useState } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import AllContacts from './allContacts';

export default function AddContact(props) {
  let [isOpen, setIsOpen] = useState(false);

  // states for form
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [telephone, setTelephone] = useState('');
  let [company, setCompany] = useState('');
  let [address, setAddress] = useState('');
  let [notes, setNotes] = useState('');

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch('http://localhost:8000/create-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          telephone: telephone,
          company: company,
          address: address,
          notes: notes,
        }),
      });

      if (response.status === 201) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setTelephone('');
        setCompany('');
        setAddress('');
        setNotes('');

        // reloads the page
        window.location.reload(true);
      }

      if (response.status != 200) {
        console.log(response.text());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="relative z-0">
      <div className="sticky top-0 flex items-center justify-between border-b-2 border-slate-200 bg-slate-700 p-4 text-white">
        <div className="font-bold">Contacts</div>
        <div>
          {isOpen ? (
            <button onClick={() => setIsOpen(false)}>
              <XIcon className="h-6 w-6 text-white" />
            </button>
          ) : (
            <button onClick={() => setIsOpen(true)}>
              <PlusIcon className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>

      {isOpen ? (
        <div className="bg-gray-100 pb-4">
          <p className="p-4 text-sm text-gray-500">
            Please create a new contact.
          </p>

          <div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col">
                <div className="border-y border-gray-100">
                  <input
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border-b px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border-b px-4 py-2"
                    required
                  />

                  <input
                    type="text"
                    value={company}
                    placeholder="Company"
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border-b px-4 py-2"
                  />
                </div>

                <div className=" mt-4 border-y border-gray-100">
                  <input
                    type="text"
                    value={telephone}
                    placeholder="Telephone"
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full border-b px-4 py-2"
                  />
                </div>

                <div className="mt-4 border-y border-gray-100">
                  <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b px-4 py-2"
                  />
                </div>

                <div className="mt-4 border-y border-gray-100">
                  <input
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border-b px-4 py-2"
                  />
                </div>

                <div className="mt-4 border-y border-gray-100">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pt-1 pl-4 text-gray-400">
                      Notes
                    </div>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full whitespace-pre border-b px-4 py-2 pt-6"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4">
                <button
                  type="submit"
                  className="w-full rounded bg-green-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-green-700"
                >
                  <span className="text-center tracking-wide">
                    create contact
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
