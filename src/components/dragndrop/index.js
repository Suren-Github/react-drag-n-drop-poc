import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

let defaultCardsTemplate = [{
    index: 0,
    name: '0',
}, {
    index: 1,
    name: '1',
}, {
    index: 2,
    name: '2',
}, {
    index: 3,
    name: '3',
}, {
    index: 4,
    name: '4',
}, {
    index: 5,
    name: '5',
}, {
    index: 6,
    name: '6',
}, {
    index: 7,
    name: '7',
}, {
    index: 8,
    name: '8',
}, {
    index: 9,
    name: '9',
}, {
    index: 10,
    name: '10',
}, {
    index: 11,
    name: '11',
}, {
    index: 12,
    name: '12',
}, {
    index: 13,
    name: '13',
}, {
    index: 14,
    name: '14',
},],

    cardsTemplate = [{
        index: 0,
        name: '0',
    }, {
        index: 1,
        name: '1',
    }, {
        index: 2,
        name: '2',
    }, {
        index: 3,
        name: '3',
    }, {
        index: 4,
        name: '4',
    }, {
        index: 5,
        name: '5',
    }, {
        index: 6,
        name: '6',
    }, {
        index: 7,
        name: '7',
    }, {
        index: 8,
        name: '8',
    }, {
        index: 9,
        name: '9',
    }, {
        index: 10,
        name: '10',
    }, {
        index: 11,
        name: '11',
    }, {
        index: 12,
        name: '12',
    }, {
        index: 13,
        name: '13',
    }, {
        index: 14,
        name: '14',
    },];

class DragNDrop extends Component {

    constructor() {
        super();
        this.state = {
            cardsTemplate: [...cardsTemplate],
        };
    }

    getIndexOfCard = (cardsTemplate, cardId, type) => {
        return cardsTemplate.findIndex(card => card.index + type === cardId);
    }

    resetCardsIndex = (updatedCardsTemplate) => {
        for (var index = 0; index < updatedCardsTemplate.length; index++) {  // Can be simplified. Resetting index
            updatedCardsTemplate[index].index = index;
        }
        return updatedCardsTemplate;
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    drag = (ev, card) => {
        let data = JSON.stringify({ srcId: ev.target.id, ...card });
        ev.dataTransfer.setData("cardData", data);
    }

    drop = (ev) => {
        ev.preventDefault();
        let srcData = ev.dataTransfer.getData("cardData"),
            srcId = JSON.parse(srcData).srcId,
            destId = ev.target.id,
            srcIndexVal = parseInt(srcId.split('-')[0]),
            destIndexVal = parseInt(destId.split('-')[0]),
            updatedCardsTemplate = [...this.state.cardsTemplate];

        if (destId.includes('-i')) { // insertion area('-i')

            if (srcIndexVal === destIndexVal || srcIndexVal === destIndexVal + 1) { // E.g.: 2,2; 3,2; 
                console.log('No change');
                return;
            }

            let srcIndex = this.getIndexOfCard(updatedCardsTemplate, srcId, '-p'),
                destIndex = this.getIndexOfCard(updatedCardsTemplate, destId, '-i');

            updatedCardsTemplate.splice(destIndex + 1, 0, this.state.cardsTemplate[srcIndex]);


            destIndex < srcIndex ? updatedCardsTemplate.splice(srcIndex + 1, 1) : updatedCardsTemplate.splice(srcIndex, 1);
            
            this.resetCardsIndex(updatedCardsTemplate);

            console.log('Insertion: ', updatedCardsTemplate);
            this.setState({ cardsTemplate: updatedCardsTemplate });

        } else { // swap area('-p')
            let temp = updatedCardsTemplate[srcIndexVal];
            updatedCardsTemplate[srcIndexVal] = updatedCardsTemplate[destIndexVal];
            updatedCardsTemplate[destIndexVal] = temp;

            this.resetCardsIndex(updatedCardsTemplate);

            console.log('Swapping: ', updatedCardsTemplate);
            this.setState({ cardsTemplate: updatedCardsTemplate });
        }
    }

    clearCards = () => {
        cardsTemplate = [...defaultCardsTemplate];
        this.setState({
            cardsTemplate: [...defaultCardsTemplate],
        });
    }


    render() {

        const { cardsTemplate, } = this.state;

        return (
            <>
                <div className='wrapper-div'>
                    {
                        cardsTemplate.map(card => {
                            return (
                                <div key={card.index}>
                                    <div id={card.index + '-s'} className='swappable-div' onDrop={this.drop} onDragOver={this.allowDrop}>
                                        <p id={card.index + '-p'} draggable="true" onDragStart={(e) => this.drag(e, card)}>{card.name}</p>
                                    </div>

                                    <div id={card.index + '-i'} className='insertion-div' onDrop={this.drop} onDragOver={this.allowDrop}>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div>
                        <input type='button' className='clear-cards' value='Clear Cards' onClick={this.clearCards} />
                    </div>
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => { return state };

export default connect(
    mapStateToProps
)(DragNDrop)

/***
 * TODOS:
 *
 * 1. Drag back the element from the destination to source
 * 2. Reorder items (like in poweramp playlist)
 *
 */