export default SearchInput({$target, initialState}) {
  this.state = initialState;
  this.$element = document.createElement('form');
  this.$element.className = "SearchInput__input";
  
  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    this.$element.innerHTML = `<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}"/>`;
  }

  this.render();
};