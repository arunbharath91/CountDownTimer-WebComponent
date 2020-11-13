/************************************************Timer v_1.0*********************************************************/
class Timer extends HTMLElement {
  private x: any;
  constructor() {
    super();
    this.projectTemplate();
  }
  protected projectTemplate() {
    const timer = `
    <h5 class="medium_font font-regular text-dark d-none">Expired</h5>
    <div class="timer-container">
        <h5 class="font-small medium_font text-dark">
            Deals End in: 
          </h5>
    <div class="timer medium_font font-1_5x text-dark">
    <span class="timer-section">
        <div class="timer-amount days"></div>
        <span class="timer-period">D</span> 
    </span> 
    <span class="timer-section">
        <div class="timer-amount hours"></div>
        <span class="timer-period">H</span>
    </span> 
    <span class="timer-section">
        <div class="timer-amount minutes"></div>
        <span class="timer-period">M</span> 
    </span> 
    <span class="timer-section">
        <div class="timer-amount seconds"></div>
        <span class="timer-period">S</span> 
    </span>
    </div>
    </div>`
    this.insertAdjacentHTML('beforeend', timer);
  }
  protected connectedCallback() {
    if (this.getAttribute('shadow') != "false") {
      this.attachShadow({ mode: 'open' });
    }
  }
  protected attributeChangedCallback(name: any) {
    switch (name) {
      case "time":
        this.render();
        break;
    }
  }
  static get observedAttributes() { return ['time']; }
  private render() {
    console.log('r')
    const countDownDate = new Date(this.getAttribute('time') || 'Jan 5, 3021 15:37:25').getTime();
    if(this.x) clearInterval(this.x);
    this.x = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();
    
      // Find the distance between now and the count down date
      const distance = countDownDate - now;
    
      (this.querySelector('.timer-amount.days') as HTMLElement).innerHTML = (this.getDays(distance)).toString();
      (this.querySelector('.timer-amount.hours') as HTMLElement).innerHTML = (this.getHours(distance)).toString();
      (this.querySelector('.timer-amount.minutes') as HTMLElement).innerHTML = (this.getMinutes(distance)).toString();
      (this.querySelector('.timer-amount.seconds') as HTMLElement).innerHTML = (this.getSeconds(distance)).toString();
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.x);
        //document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  private getDays(t: number) {
    return Math.floor( t/(1000*60*60*24) );
  }
  
  private getHours(t: number) {
    return Math.floor( (t/(1000*60*60)) % 24 );
  }
  
  private getMinutes(t: number) {
    return Math.floor( (t/1000/60) % 60 );
  }
  
  private getSeconds(t: number) {
    return Math.floor( (t/1000) % 60 );
  }

  disconnectedCallback() { 
    clearInterval(this.x);
  }

}

window.customElements.define("app-timer", Timer);
/*********************************************************************************************************/
