import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef } from 'react';
import {
  MailIcon,
  PhoneIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline';

export default function MyModal(props) {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  let [contact, setContact] = useState({});
  let completeButtonRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
          console.log(data);
        })
        .catch((err) => console.log(err));
    }

    if (isOpen) {
      fetchContact();
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        ref={completeButtonRef}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Edit
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          initialFocus={completeButtonRef}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {!isDelete ? (
                  <div>
                    <Dialog.Title className="flex flex-col text-xl font-bold leading-6 text-gray-900">
                      {contact.first_name} {contact.last_name}
                      <span className="text-sm font-normal text-gray-600">
                        {contact.company}
                      </span>
                      <hr className="my-4" />
                    </Dialog.Title>
                    <div>
                      <div className="flex flex-col leading-10">
                        <div className="flex items-center">
                          <MailIcon className="mr-4 h-6 w-6 text-gray-600" />
                          <a
                            href={`mailto"${contact.email}`}
                            className="hover:text-blue-500 hover:underline"
                          >
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="mr-4 h-6 w-6 text-gray-600" />
                          <a
                            href={`tel:${contact.tel}`}
                            className="hover:text-blue-500 hover:underline"
                          >
                            {contact.telephone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <OfficeBuildingIcon className="mr-4 h-6 w-6 text-gray-600" />
                          <span>{contact.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Dialog.Title className="flex flex-col text-xl font-bold leading-6 text-gray-900">
                      Are you sure?
                      <hr className="my-4" />
                    </Dialog.Title>
                    <div>
                      <p>
                        Deleting this contact is{' '}
                        <span className="font-bold text-red-500">
                          permanent
                        </span>{' '}
                        and can not be recovered.
                      </p>
                      <div className="my-5 flex justify-center">
                        <span role="img" className="mx-auto block p-4 text-6xl">
                          🤔 😱 👻
                        </span>
                      </div>
                      <p>If No! please just click outside this modal.</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="rounded bg-green-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-green-700">
                    <span className="text-center">edit</span>
                  </button>

                  {!isDelete ? (
                    <button
                      onClick={() => setIsDelete(true)}
                      className="rounded bg-red-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-red-700"
                    >
                      <span className="text-center tracking-wide">delete</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => deleteContact()}
                      className="rounded bg-red-500 px-4 py-3 capitalize text-white duration-100 ease-in-out hover:bg-red-700"
                    >
                      <span className="text-center tracking-wide">
                        yes delete them!
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
