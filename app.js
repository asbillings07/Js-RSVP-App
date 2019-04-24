// ensures program works if script tag is placed at top of HTML file

document.addEventListener('DOMContentLoaded', () => {


  const form = document.getElementById('registrar');
  const mainDiv = document.querySelector('.main');
  const input = form.querySelector('input')
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');
  const filterLablel = document.createElement('label');
  const filterCheckbox = document.createElement('input');
  
  filterLablel.textContent = "Hide those who haven't responded"
  filterCheckbox.type = 'checkbox'
  div.appendChild(filterLablel)
  div.appendChild(filterCheckbox)
  mainDiv.insertBefore(div, ul)
  
  // hides those who haven't responded when check box is checked
  
  filterCheckbox.addEventListener('change', (e) => {
     const isChecked = e.target.checked;
     const lis = ul.children
      if (isChecked) {
    for ( let i = 0; i < lis.length; i++) {
        let li = lis[i];
      if (li.className === 'responded') {
        
      li.style.display = '';
        
      } else {
        li.style.display = 'none';
    }
   }
  
  }  else  {
    for ( let i = 0; i < lis.length; i++) {
      let li = lis[i];
      li.style.display = '';
    }
  
  }                         
                                  
  });
  
  // function that creates all the elements needed adds them to the list element and returns the list element
  
  function createLI(text) {
    
    function createElement(elementName, property, value) {
      
    const element = document.createElement(elementName);
    element[property] = value;
      return element
    
    }
    
    function appendToLI(elementName, property, value) {
       const element = createElement(elementName, property, value);
       li.appendChild(element)
       return element;
    }
    
  const li = document.createElement('li');
     appendToLI('span', 'textContent', text);
    const label = appendToLI('label', 'textContent', 'confirmed');
    const checkbox = createElement('input', 'type', 'checkbox');
    label.appendChild(checkbox)
    
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    
    
    return li;
  
  }
  
  // this event handler will submit the form
  form.addEventListener('submit', (e) => {
    // this prevents the form from reloading since there is no database attached
    e.preventDefault()
   const text = input.value
   input.value = ''
   
  const li = createLI(text )
     ul.appendChild(li);
   
                     
  });
  
  
  // listens for any change in the checkbox field and turns the boarder blue when checked
  ul.addEventListener('change', (e) =>{
    
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
   }
    
  })
  
  // Allows you to delete, edit or save the RSVP
  ul.addEventListener('click', (e) => {
     if (e.target.tagName === 'BUTTON') {
       const button = e.target;
        const li = e.target.parentNode;
        const ul = li.parentNode;
       const action = button.textContent;
       
       // object that holds all of the name functions 
       const nameActions = {
       remove:  () => {
       ul.removeChild(li);
       },
             
       edit: () => {
         const span = li.firstElementChild;
       const input = document.createElement('input');
         input.type = 'text';
         input.value = span.textContent
         li.insertBefore(input, span);
         li.removeChild(span);
         button.textContent = 'save'
       },
       
       save: () => {
       const input = li.firstElementChild;
          const span = document.createElement('span')
          span.textContent = input.value
          li.insertBefore(span, input)
          li.removeChild(input)
          button.textContent = 'edit'
      }
       
       
       };
       
      
       
       
       
       // select and run action in button's name
        nameActions[action]();
      
      
  }             
                      
   });

});






