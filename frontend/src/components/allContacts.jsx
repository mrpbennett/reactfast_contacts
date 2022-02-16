import React, { useEffect, useState } from 'react';

import PhoneLayout from './layouts/phoneLayout';
import AddContact from './addContact';
import ShowContact from './showContact';

export default function AllContacts() {
  let [contacts, setContacts] = useState([]);
  let [showContact, setShowContact] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/all-contacts`)
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <PhoneLayout>
      <div className="relative">
        <AddContact />
        <div className="flex flex-col">
          {contacts.map((contact) => (
            <div key={contact.id}>
              {showContact === contact.id ? (
                <ShowContact contactId={contact.id} open={true} />
              ) : (
                <div
                  className="border-b border-slate-200 p-4 py-2 text-left capitalize text-slate-700 hover:bg-slate-200"
                  onClick={() =>
                    setShowContact((show) =>
                      show === contact.id ? null : contact.id
                    )
                  }
                >
                  <span className="font-bold">{contact.first_name}</span>{' '}
                  {contact.last_name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PhoneLayout>
  );
}
