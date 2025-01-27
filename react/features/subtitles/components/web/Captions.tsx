import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';

import { IReduxState } from '../../../app/types';
import Icon from '../../../base/icons/components/Icon';
import { IconMove } from '../../../base/icons/svg';
import { getLocalParticipant } from '../../../base/participants/functions';
import Button from '../../../base/ui/components/web/Button';
import { getLargeVideoParticipant } from '../../../large-video/functions';
import { isLayoutTileView } from '../../../video-layout/functions.web';
import {
    AbstractCaptions,
    type IAbstractCaptionsProps,
    _abstractMapStateToProps
} from '../AbstractCaptions';


interface IProps extends IAbstractCaptionsProps {

    /**
     * Whether the subtitles container is lifted above the invite box.
     */
    _isLifted: boolean | undefined;

    /**
     * The visibility of the transcription window.
     */
    _isTranscriptionWindowVisible: boolean;

    /**
     * Whether the component is in mock mode.
     */
    isMockMode?: boolean;
}

/**
 * React {@code Component} which can display speech-to-text results from
 * Jigasi as subtitles.
 *
 * @returns {ReactElement} - The React element which displays the subtitles.
 */

interface IState {
    fontSize: number;
    height: number | string;
    width: number;
    x: number;
    y: number;
}
class Captions extends AbstractCaptions<IProps> {

    state: IState = {
        fontSize: 24,
        width: window.innerWidth * 0.6,
        height: 'auto',
        x: (window.innerWidth - (window.innerWidth * 0.6)) / 2,
        y: window.innerHeight / 2

    };

    _onIncreaseFontSize = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ fontSize: this.state.fontSize + 2 });
    };
    _onDecreaseFontSize = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ fontSize: this.state.fontSize - 2 });
    };

    _onDragStop = (e, d) => {
        this.setState({ x: d.x,
            y: d.y });
    };

    // eslint-disable-next-line max-params
    _onResizeStop = (e, direction, ref, delta, position) => {
        this.setState({
            width: parseFloat(ref.style.width),
            height: parseFloat(ref.style.height),
            x: position.x,
            y: position.y
        });
    };

    /**
     * Renders the transcription text.
     *
     * @param {string} id - The ID of the transcript message from which the
     * {@code text} has been created.
     * @param {string} text - Subtitles text formatted with the participant's
     * name.
     * @protected
     * @returns {ReactElement} - The React element which displays the text.
     */
    _renderParagraph(id: string, text: string): ReactElement {
        return (
            <p
                className = { 'transcription-text' }
                key = { id }
                style = {{ fontSize: `${this.state.fontSize}px` }}>
                <span>{ text }</span>
            </p>
        );
    }

    /**
     * Generates mock paragraphs for debugging.
     *
     * @protected
     * @returns {Array<ReactElement>} - An array of mock subtitle elements.
     */
    _generateMockParagraphs(): Array<ReactElement> {
        const mockData = [
            { id: '1',
                text: 'Dies ist ein Testuntertitel. Dies ist ein Testuntertitel. Dies ist ein Testuntertitel.' },
            { id: '2',
                text: 'Hier ist ein weiterer Testuntertitel.' },
            { id: '3',
                text: 'Und hier kommt ein letzter Untertitel.' }
        ];

        return mockData.map(data => this._renderParagraph(data.id, data.text));
    }

    /**
     * Renders the subtitles container.
     *
     * @param {Array<ReactElement>} paragraphs - An array of elements created
     * for each subtitle using the {@link _renderParagraph} method.
     * @protected
     * @returns {ReactElement} - The subtitles container.
     */
    _renderSubtitlesContainer(paragraphs: Array<ReactElement>): ReactElement {
        const { _isTranscriptionWindowVisible } = this.props;

        console.log('xxy isTranscriptionWindowVisible:', _isTranscriptionWindowVisible);
        if (!_isTranscriptionWindowVisible) {
            return <></>;
        }

        const className = this.props._isLifted
            ? 'transcription-subtitles lifted'
            : 'transcription-subtitles';
        const windowWidth = window.innerWidth - 50;
        const windowHeight = window.innerHeight - 50;
        const defaultWidth = windowWidth * 0.6;
        const defaultHeight = windowHeight * 0.3;
        const defaultX = (windowWidth - defaultWidth) / 2;
        const defaultY = (windowHeight - defaultHeight) / 2;

        return (
            <>
                <Rnd
                    bounds = 'parent'
                    className = 'rnd-container'
                    enableResizing = {{ top: false,
                        right: true,
                        bottom: false,
                        left: true,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false }}
                    enableTouchSupport = { true }

                    height = { 'auto' }
                    minHeight = { '10vw' }
                    minWidth = { '13vw' }
                    onDragStop = { this._onDragStop }
                    onResizeStop = { this._onResizeStop }
                    position = {{ x: this.state.x ?? defaultX,
                        y: this.state.y ?? defaultY }}
                    size = {{ width: this.state.width,
                        height: this.state.height }}
                    touchDragContainer = { document.body }>
                    <div
                        aria-hidden = { true }
                        className = { className }>
                        <div className = 'fontsize-container'>
                            <Icon
                                className = 'icon-left'
                                size = { 30 }
                                src = { IconMove } />
                            <Button
                                className = 'button-text'
                                label = '+'
                                onClick = { this._onIncreaseFontSize }
                                onTouchEnd = { this._onIncreaseFontSize }
                                size = 'small' />
                            <Button
                                className = 'button-text'
                                label = '-'
                                onClick = { this._onDecreaseFontSize }
                                onTouchEnd = { this._onDecreaseFontSize }
                                size = 'small' />
                        </div>
                        { paragraphs }
                    </div>
                </Rnd>
            </>
        );
    }

    // Mock-Transkription:
    // wenn isMockMode in Conference.tsx auf true gesetzt wird, bitte die render()-funktion entkommentieren
    // render() {
    //     console.log('xxy current fontsize:', this.state.fontSize);

    //     const paragraphs = this.props.isMockMode
    //         ? this._generateMockParagraphs()
    //         : Array.from(this.props._transcripts!.entries()).map(([ id, text ]) => this._renderParagraph(id, text));

    //     return this._renderSubtitlesContainer(paragraphs);
    // }
}

/**
 * Maps (parts of) the redux state to the associated {@code }'s
 * props.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {Object}
 */
function mapStateToProps(state: IReduxState) {
    const isTileView = isLayoutTileView(state);
    const largeVideoParticipant = getLargeVideoParticipant(state);
    const localParticipant = getLocalParticipant(state);

    return {
        ..._abstractMapStateToProps(state),
        _isLifted: Boolean(largeVideoParticipant && largeVideoParticipant?.id !== localParticipant?.id && !isTileView),
        _isTranscriptionWindowVisible: state['features/subtitles']._isTranscriptionWindowVisible
    };
}

export default connect(mapStateToProps)(Captions);
