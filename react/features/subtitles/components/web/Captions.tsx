import React, { ReactElement, createRef } from 'react';
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
    width: number | string;
    x: number;
    y: number;
}

class Captions extends AbstractCaptions<IProps> {
    state: IState;
    private _resizeObserver?: ResizeObserver;
    parentContainerRef = createRef<HTMLDivElement>();

    constructor(props: IProps) {
        super(props);

        this.state = {
            fontSize: 24,
            width: '60vw',
            height: 'auto',
            x: 0,
            y: 0
        } as IState;
    }

    componentDidMount() {
        if (this.parentContainerRef.current) {

            const parentWidth = this.parentContainerRef.current.offsetWidth;
            const desiredWidth = parentWidth * 0.85;
            const desiredX = (parentWidth - desiredWidth) / 2;
            const desiredY = 250;

            this.setState({
                width: desiredWidth,
                height: 'auto',
                x: desiredX,
                y: desiredY
            });

            const resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const newParentWidth = entry.contentRect.width;
                    const newWidth = newParentWidth * 0.85;
                    const newVerticalCenter = window.innerHeight / 2;
                    const newY = newVerticalCenter - 250;
                    const newX = (newParentWidth - newWidth) / 2;

                    this.setState({
                        width: newWidth,
                        x: newX,
                        y: newY
                    });
                }
            });

            resizeObserver.observe(this.parentContainerRef.current);
            this._resizeObserver = resizeObserver;
        }
    }

    componentWillUnmount() {
        this._resizeObserver?.disconnect();
    }

    // eslint-disable-next-line max-params
    handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {

        this.setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            x: position.x,
            y: position.y
        });
    };
    handleDragStop = (e: any, data: any) => {
        this.setState({
            x: data.x,
            y: data.y
        });
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

    _onDragStop = (_e: any, d: { x: number; y: number; }) => {
        const maxY = window.innerHeight - 200;
        const minY = 0;

        this.setState({
            x: d.x,
            y: Math.min(Math.max(d.y, minY), maxY)
        });
    };
    // eslint-disable-next-line max-params
    _onResizeStop = (_e: any, _direction: any, ref: HTMLElement, _delta: any, position: { x: number; y: number; }) => {
        const parentWidth = this.parentContainerRef.current?.offsetWidth ?? window.innerWidth;
        const newWidth = parseFloat(ref.style.width);
        const constrainedWidth = Math.min(newWidth, parentWidth);
        const newX = (parentWidth - constrainedWidth) / 2;

        this.setState({
            width: constrainedWidth,
            height: parseFloat(ref.style.height),
            x: newX,
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

        if (!_isTranscriptionWindowVisible) {
            return <></>;
        }

        const className = this.props._isLifted
            ? 'transcription-subtitles lifted'
            : 'transcription-subtitles';

        const parentWidth = this.parentContainerRef.current?.offsetWidth ?? window.innerWidth;

        return (
            <>
                <div
                    className = 'transcription-wrapper'
                    ref = { this.parentContainerRef }>
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
                        maxWidth = { parentWidth * 0.9 }
                        minHeight = { '10vw' }
                        minWidth = { parentWidth * 0.5 }
                        onDragStop = { this._onDragStop }
                        onResizeStop = { this._onResizeStop }

                        position = {{ x: this.state.x,
                            y: this.state.y }}
                        size = {{ width: this.state.width,
                            height: this.state.height }}


                        touchDragContainer = { document.body }
                        width = { this.state.width || parentWidth * 0.85 }>
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
                </div>
            </>
        );
    }
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
