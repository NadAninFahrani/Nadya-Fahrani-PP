const createBtn = document.querySelector(".btn");
const notesContainer = document.querySelector(".notes-container");

// Load existing notes from local storage when the page is loaded
showNotes();

createBtn.addEventListener("click", () => {
  // Create a new note container div
  const newNote = document.createElement("div");
  newNote.className = "note"; // Change the class to "note"

  // Create avatars for the new note
  const noteAvatar = document.createElement("img");
  noteAvatar.className = "note-avatar";
  noteAvatar.src = "images-postit/notes-redesign.png";

  const trashAvatar = document.createElement("img");
  trashAvatar.className = "trash-avatar";
  trashAvatar.src = "images-postit/trash-redesign.png";

  // Create a container for the avatars
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container";
  avatarContainer.appendChild(noteAvatar);
  avatarContainer.appendChild(trashAvatar);

  // Append the avatar container to the new note container
  newNote.appendChild(avatarContainer);

  // Create elements for the new note
  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  const noteDate = createEditableElement("p", "date", formattedDate);
  const noteTitle = createEditableElement("p", "title", "TITLE");
  const noteInput = createEditableElement("p", "input", "Today's Reflection");
  const moodBar = createMoodBar();

  // Append all elements to the new note container
  newNote.appendChild(noteDate);
  newNote.appendChild(noteTitle);
  newNote.appendChild(noteInput);
  newNote.appendChild(moodBar);

  // Append the new note to the existing notes container
  notesContainer.appendChild(newNote);

  // Add input event listeners to the new note
  addInputEventListeners();
  // Add middle button event listeners to the new note
  addMiddleButtonEventListeners(newNote);

  // Update local storage
  updateStorage();
});

function addInputEventListeners() {
  // Get all input elements with contenteditable attribute
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );

  // Add input event listeners to update storage on keyboard input
  editableElements.forEach((element) => {
    element.addEventListener("input", updateStorage);
    // element.addEventListener("keydown", handleEnterKey);
  });
}

function addMiddleButtonEventListeners(note) {
  const middleButtons = note.querySelectorAll(".middle-btn");

  middleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Reset all mood buttons within the note to default
      resetMoodButtons(note);

      // Remove "selected" class from all middle buttons within the note
      middleButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      // Toggle the "selected" class for the clicked middle button
      button.classList.toggle("selected");

      // Determine color based on the value of the clicked middle button
      let color;
      const buttonValue = parseInt(button.textContent);
      if (buttonValue < 5 || button.id === "smileButton") {
        color = "green";
      } else if (buttonValue >= 5 && buttonValue <= 6) {
        color = "yellow";
      } else {
        color = "red";
      }

      // Set the color for all mood buttons within the note
      setMoodButtonsColor(note, color);

      // Update storage after setting the color
      updateStorage();
    });
  });
}

function handleEnterKey(event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.key === "Enter") {
    // Prevent the default behavior (new paragraph creation)
    event.preventDefault();

    // Optionally, you can trigger a different action here if needed
    // For example, you can move focus to the next editable element
    // by programmatically selecting the next sibling or performing
    // any other desired behavior.
  }
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  const notes = notesContainer.querySelectorAll(".note");
  notes.forEach((note) => {
    addInputEventListeners();
    addMiddleButtonEventListeners(note);
  });
}

function createEditableElement(elementType, className, defaultText) {
  const element = document.createElement(elementType);
  element.contentEditable = true;
  element.className = className;
  element.textContent = defaultText;
  return element;
}

function createMoodBar() {
  const moodBar = document.createElement("div");
  moodBar.className = "mood-bar";

  const smileBtn = createMoodButton(
    "images-postit/smile-new.png",
    "big-btn smile-icon middle-btn"
  );
  smileBtn.id = "smileButton"; // Adding ID to smileBtn
  moodBar.appendChild(smileBtn);

  for (let i = 2; i <= 9; i++) {
    const middleBtn = createMoodButton(null, "middle-btn", i);
    moodBar.appendChild(middleBtn);
  }

  const sadBtn = createMoodButton(
    "images-postit/sad-new.png",
    "big-btn sad-icon middle-btn"
  );
  sadBtn.id = "sadButton"; // Adding ID to sadBtn
  moodBar.appendChild(sadBtn);

  return moodBar;
}

function createMoodButton(imageSrc, btnClass, textContent = "") {
  const button = document.createElement("button");
  button.className = btnClass;

  if (imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;
    button.appendChild(img);
  } else {
    button.textContent = textContent;
  }

  return button;
}

function resetMoodButtons(note) {
  const allMoodButtons = note.querySelectorAll(".big-btn, .middle-btn");
  allMoodButtons.forEach((button) => {
    button.style.backgroundColor = "";
  });
}

function setMoodButtonsColor(note, color) {
  const moodButtons = note.querySelectorAll(".big-btn, .middle-btn");
  moodButtons.forEach((button) => {
    button.style.backgroundColor = color;
  });
}

document.addEventListener("click", function (event) {
  const clickedElement = event.target;

  // Check if the clicked element is the "trash-avatar"
  if (clickedElement.classList.contains("trash-avatar")) {
    // Get the parent element (note) of the clicked trash-avatar
    const parentNote = clickedElement.closest(".note");

    // Remove the card if the trash-avatar is clicked
    if (parentNote) {
      parentNote.remove();
      updateStorage();
    }
  }
});

function myAMYGDALA() {
  var amygdalacontainer = document.getElementById("popupamyg");
  amygdalacontainer.classList.toggle("show");
}

