import netology from '../img/netology.svg';
import goblin from '../img/goblin.png';

export default class GamePlay {
  constructor(row = 4, column = 4) {
    this.row = row;
    this.column = column;
    this.container = null;
    this.field = null;
    this.cells = [];
    this.cellIndex = 0;
    this.newCellIndex = 0;
    this.intervalChanging = null;
  }

  drawField() {
    this.container = document.getElementById('gameContainer');
    this.field = document.createElement('table');
    this.field.className = 'field table-field';
    this.field.id = 'tableField';
    this.container.append(this.field);
    this.field.style.height = '100%';
    this.field.style.width = `${this.field.clientHeight}px`;
    this.field.style.borderSpacing = '5px';

    for (let i = 0; i < this.row; i++) {
      const tableRow = document.createElement('tr');
      tableRow.className = 'row table-row';
      this.field.append(tableRow);

      for (let j = 0; j < this.column; j++) {
        const tableCell = document.createElement('td');
        tableCell.className = 'cell table-cell';
        const cellImage = document.createElement('img');
        cellImage.className = 'image cell-image';
        cellImage.src = netology;
        cellImage.alt = 'Netology Logo';
        tableCell.append(cellImage);
        tableRow.append(tableCell);
      }
    }

    this.cells = [...this.field.querySelectorAll('.table-cell')];

    for (const cell of this.cells) {
      cell.style.hight = `${this.field.clientHeight / this.row}px`;
      cell.style.width = `${this.field.clientWidth / this.column}px`;
    }
  }

  changeImage() {
    this.newCellIndex = Math.floor(Math.random() * this.cells.length);

    if (this.newCellIndex === this.cellIndex) {
      if (this.newCellIndex + 1 <= this.cells.length) {
        this.newCellIndex += 1;
      } else if (this.newCellIndex - 1 >= 0) {
        this.newCellIndex += 1;
      }
    }
    const image = this.cells[this.cellIndex].querySelector('.cell-image');
    const randomImage = this.cells[this.newCellIndex].querySelector('.cell-image');

    image.src = netology;
    randomImage.src = goblin;

    this.cellIndex = this.newCellIndex;
  }

  startGame() {
    const startButton = document.getElementById('startButton');
    startButton.onclick = () => {
      this.intervalChanging = setInterval(() => {
        this.changeImage();
      }, 1000);
    };
  }

  stopGame() {
    const stopButton = document.getElementById('stopButton');
    stopButton.onclick = () => {
      clearInterval(this.intervalChanging);
      this.cells[this.cellIndex].querySelector('.cell-image').src = netology;
    };
  }
}
