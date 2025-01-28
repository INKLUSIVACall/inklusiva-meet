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
    width: number;
    x: number;
    y: number;
}

interface IRndSize {
    height: number | string;
    width: number | string;
}
class Captions extends AbstractCaptions<IProps> {
    state: IState;
    private _resizeObserver?: ResizeObserver;
    parentContainerRef = createRef<HTMLDivElement>();

    constructor(props: IProps) {
        super(props);

        this.state = {
            fontSize: 24,
            width: 0,
            height: 'auto',
            x: 0,
            y: 0
        } as IState;
    }

    componentDidMount() {
        if (this.parentContainerRef.current) {
            const parentWidth = this.parentContainerRef.current.offsetWidth;
            const desiredWidth = parentWidth * 0.6;

            this.setState({
                width: desiredWidth,
                x: (parentWidth - desiredWidth) / 2,
                y: window.innerHeight / 2
            });

            const resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const newParentWidth = entry.contentRect.width;
                    const newWidth = newParentWidth * 0.6;

                    this.setState({
                        width: newWidth,
                        x: (newParentWidth - newWidth) / 2
                    });
                }
            });

            resizeObserver.observe(this.parentContainerRef.current);
            this._resizeObserver = resizeObserver;
        }
    }

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
        this.setState({
            x: d.x,
            y: d.y
        });
    };
    // eslint-disable-next-line max-params
    _onResizeStop = (_e: any, _direction: any, ref: HTMLElement, _delta: any, position: { x: number; y: number; }) => {
        const parentWidth = this.parentContainerRef.current?.offsetWidth ?? window.innerWidth;
        const newWidth = parseFloat(ref.style.width);
        const constrainedWidth = Math.min(newWidth, parentWidth);

        this.setState({
            width: constrainedWidth,
            height: parseFloat(ref.style.height),
            x: Math.min(position.x, parentWidth - constrainedWidth),
            y: position.y
        });
    };
    getAvailableWidth = () => {
        const parentContainer = this.parentContainerRef.current;

        if (parentContainer) {
            const parentWidth = parentContainer.offsetWidth;

            console.log('xxy parentContainer is available, using width:', parentWidth);

            return parentWidth;
        }
        console.log('xxy parentContainer is not available, using default-value');

        return window.innerWidth * 0.6;
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
        const defaultWidth = parentWidth * 0.9;


        return (
            <>
                <div
                    className = 'transcription-wrapper'
                    ref = { this.parentContainerRef }>
                    <Rnd
                        bounds = 'parent'
                        className = 'rnd-container'
                        default = {{
                            x: ((this.parentContainerRef.current?.offsetWidth
                                ?? window.innerWidth) / 2) - (this.state.width / 2),
                            y: (window.innerHeight / 2) - 50,
                            width: this.state.width,
                            height: 'auto'
                        }}
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
                        maxWidth = { defaultWidth }
                        minHeight = { '10vw' }
                        minWidth = { '17vw' }
                        onDragStop = { this._onDragStop }
                        onResizeStop = { this._onResizeStop }

                        size = { this.state as IRndSize }

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
