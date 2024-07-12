if (!customElements.get('cart-note')) {
  customElements.define('cart-note', class CartNote extends HTMLElement {
    constructor() {
      super();

      const debouncedUpdate = debounce(() => {
        this.updateCartNote();
      }, 300);

      this.addEventListener('change', debouncedUpdate);

      this.newNoteValue = '';
      this.checkbox1 = document.getElementById('checkbox1');
      this.specificDateField = document.getElementById('specificDate');
      this.cartNoteTextArea = document.getElementById('CartDrawer-Note');
      this.cartNoteTextArea.value = '';
      this.checkboxes = document.querySelectorAll('input[name="special_instructions[]"]');
      this.errorMsg = document.createElement('p');
      this.errorMsg.style.color = 'red';

      this.checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', debouncedUpdate);
      });

      if (this.checkbox1) {
        this.checkbox1.addEventListener('change', () => {
          this.specificDateField.value = null;
          this.specificDateField.classList.toggle('visually-hidden', !this.checkbox1.checked);
          this.updateCartNote();
        });
      }

      if (this.specificDateField) {
        this.specificDateField.addEventListener('change', debouncedUpdate);
      }

      if (this.specificDateField.parentNode) {
        this.specificDateField.parentNode.appendChild(this.errorMsg);
      }
    }

    updateCartNote() {
      
      this.newNoteValue = this.cartNoteTextArea.value || '';

      const selectedValues = Array.from(this.checkboxes).reduce((instructions, checkbox) => {
        if (checkbox.checked) {
          let instruction = checkbox.value;
          if (checkbox.id === 'checkbox1' && this.specificDateField.value.trim() !== '') {
            instruction = `${checkbox.value}: ${this.specificDateField.value}`;
            this.errorMsg.textContent = '';
          } else if (checkbox.id === 'checkbox1' && this.specificDateField.value.trim() === '') {
            this.errorMsg.textContent = 'Please provide a specific date.';
            this.errorMsg.scrollIntoView();
            return instructions;
          }
          instructions.push(instruction);
        }
        return instructions;
      }, []);

      if (selectedValues.length > 0) {
        this.newNoteValue += `\n\nSpecial Instructions:\n${selectedValues.join('\n')}`;
      }
      console.log(this.newNoteValue);

      const body = JSON.stringify({ note: this.newNoteValue });
      fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
    }

    connectedCallback() {
      this.updateCartNote();
    }
  });
};