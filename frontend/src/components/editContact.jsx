import { useState } from 'react';

export default function EditContact(props) {
  // states for form
  let [firstName, setFirstName] = useState(props.firstname);
  let [lastName, setLastName] = useState(props.lastname);
  let [email, setEmail] = useState(props.email);
  let [telephone, setTelephone] = useState(props.telephone);
  let [company, setCompany] = useState(props.company);
  let [address, setAddress] = useState(props.address);
  let [notes, setNotes] = useState(props.notes);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `http://localhost:8000/update-contact/${props.contactId}`,
        {
          method: 'PATCH',
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
        }
      );

      if (response.status === 200) {
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

      if (response.status !== 200) {
        console.log(response.text());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-slate-100 pb-4">
        <div className="p-4">
          <button
            className="capitalize text-blue-500 hover:text-blue-700"
            onClick={() => window.location.reload(true)}
          >
            back
          </button>
        </div>

        <div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col">
              <div className="border-y border-gray-100">
                <input
                  type="text"
                  value={firstName}
                  placeholder={props.firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border-b px-4 py-2"
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder={props.lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border-b px-4 py-2"
                />

                <input
                  type="text"
                  value={company}
                  placeholder={props.company === '' ? 'Company' : props.company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border-b px-4 py-2"
                />
              </div>

              <div className=" mt-4 border-y border-gray-100">
                <input
                  type="text"
                  value={telephone}
                  placeholder={
                    props.telephone === '' ? 'Telephone' : props.telephone
                  }
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full border-b px-4 py-2"
                />
              </div>

              <div className="mt-4 border-y border-gray-100">
                <input
                  type="text"
                  value={email}
                  placeholder={props.email === '' ? 'Email' : props.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b px-4 py-2"
                />
              </div>

              <div className="mt-4 border-y border-gray-100">
                <input
                  type="text"
                  value={address}
                  placeholder={props.address === '' ? 'Address' : props.address}
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
                    placeholder={props.notes === '' ? '...' : props.notes}
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
                  update contact
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
