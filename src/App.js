import "./App.css";
import contactsJSON from "./contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.splice(0, 2));

  const randomCeleb = () => {
    if (contactsJSON.length > 0) {
      return contactsJSON.splice(
        Math.floor(Math.random() * contactsJSON.length),
        1
      )[0];
    } else {
      console.log("no more celebs");
      return null;
    }
  };
  const sortByName = () => {
    contacts.sort((a, b) => {
      let nameA = a.name;
      let nameB = b.name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return [...contacts];
  };
  const sortByPopularity = () => {
    contacts.sort((a, b) => {
      let popularityA = a.popularity;
      let popularityB = b.popularity;
      if (popularityA < popularityB) {
        return 1;
      }
      if (popularityA > popularityB) {
        return -1;
      }
      return 0;
    });
    return [...contacts];
  };

  const deleteById = (id) => {
    console.log(id);
    const newcon = contacts.filter((element) => element.id !== id);
    console.log(newcon);
    return [...newcon];
  };

  return (
    <div className="App" key="App">
      <h1>Celebs:</h1>

      <button
        onClick={() => {
          if (randomCeleb()) {
            const updatedContacts = [...contacts, randomCeleb()];
            setContacts(updatedContacts);
          }
        }}
      >
        Add Celeb
      </button>

      <button
        onClick={() => {
          const updatedContacts = sortByName();
          setContacts(updatedContacts);
        }}
      >
        Sort by Name
      </button>

      <button
        onClick={() => {
          const updatedContacts = sortByPopularity();
          setContacts(updatedContacts);
        }}
      >
        Sort by Popularity
      </button>

      <tbody>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>

        {contacts.map((element) => {
          return (
            <tr key={element.id}>
              <td>
                <img src={element.pictureUrl} alt="A thing of a celeb" />
              </td>
              <td>
                <h4>{element.name}</h4>
              </td>
              <td>
                <p>{element.popularity}</p>
              </td>
              <td>{element.wonOscar ? "🏆" : null}</td>
              <td>{element.wonEmmy ? "🏆" : null}</td>
              <td>
                <button
                  onClick={() => {
                    const updatedContacts = deleteById(element.id);
                    setContacts(updatedContacts);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </div>
  );
}

export default App;
