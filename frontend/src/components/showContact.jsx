import { useEffect, useState } from 'react';

import EditContact from './editContact';

export default function ShowContact(props) {
  let [isOpen, setIsOpen] = useState(false);
  let [contact, setContact] = useState({});
  let [edit, setEdit] = useState(false);

  // delete contact from api then reloads the page
  function deleteContact() {
    fetch(`http://localhost:8000/delete-contact/${props.contactId}`, {
      method: 'DELETE',
    }).catch((err) => console.log(err));

    setIsOpen(false);
    window.location.reload(true);
  }

  // get contact from api by contact id
  useEffect(() => {
    async function fetchContact() {
      await fetch(`http://localhost:8000/get-contact/${props.contactId}`)
        .then((response) => response.json())
        .then((data) => {
          setContact(data);
        })
        .catch((err) => console.log(err));
    }

    if (props.open) {
      fetchContact();
    }
  }, []);

  return (
    <>
      {edit ? (
        <EditContact
          contactId={props.contactId}
          firstname={contact.first_name}
          lastname={contact.last_name}
          company={contact.company}
          telephone={contact.telephone}
          email={contact.email}
          address={contact.address}
          notes={contact.notes}
        />
      ) : (
        <div className="bg-slate-100 p-4">
          <div className="flex items-center">
            <button
              className="capitalize text-blue-500 hover:text-blue-700"
              onClick={() => window.location.reload(true)}
            >
              back
            </button>
          </div>
          <div>
            {/* <div className="mx-auto my-4 block w-fit rounded-full bg-gray-300 p-6 ">
        ...
      </div> */}
            <div className="flex flex-col text-center">
              <span className="font-bold">
                {contact.first_name} {contact.last_name}
              </span>
              <span className="text-sm text-slate-400">{contact.company}</span>
            </div>

            {contact.telephone !== '' || contact.telephone === 'NULL' ? (
              <div className="my-4 flex flex-col rounded-md bg-white p-4 text-left">
                <span className="text-sm font-medium">telephone</span>
                <a
                  href={`tel:${contact.telephone}`}
                  className="text-sm text-blue-500"
                >
                  {contact.telephone}
                </a>
              </div>
            ) : null}

            {contact.email !== '' || contact.email === 'NULL' ? (
              <div className="my-4 flex flex-col rounded-md bg-white p-4 text-left">
                <span className="text-sm font-medium">email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-blue-500"
                >
                  {contact.email}
                </a>
              </div>
            ) : null}

            {contact.address !== '' || contact.address === 'NULL' ? (
              <div className="my-4 flex flex-col rounded-md bg-white p-4 text-left">
                <span className="text-sm font-medium">address</span>
                <span className="text-sm text-blue-500">{contact.address}</span>
              </div>
            ) : null}

            {contact.notes !== '' || contact.notes === 'NULL' ? (
              <div className="my-4 flex flex-col whitespace-normal rounded-md bg-white p-4 text-left">
                <span className="text-sm font-medium">notes</span>
                <span className=" text-sm">{contact.notes}</span>
              </div>
            ) : null}
          </div>

          {isOpen ? (
            <div>
              <div className="mt-6 flex flex-col">
                <button
                  className="rounded bg-red-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-red-700"
                  onClick={deleteContact}
                >
                  <span className="text-center tracking-wide">delete</span>
                </button>
                <button
                  className="mt-1 rounded bg-blue-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-blue-700"
                  onClick={() => setEdit(true)}
                >
                  <span className="text-center">edit</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mt-6 flex flex-col">
                <button
                  className="mb-1 rounded bg-blue-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-blue-700"
                  onClick={() => setEdit(true)}
                >
                  <span className="text-center">edit</span>
                </button>
                <button
                  className="rounded bg-red-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-red-700"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="text-center tracking-wide">delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
