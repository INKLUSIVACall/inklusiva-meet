import React, { Component } from 'react';

export class AudioFilters {
    /**
     * Audio context to attach the HTML Audio Element to.
     */
    private _audioContext: AudioContext;

    /**
     * Biquad Filter to handle the low pass filter.
     */
    private _filter: BiquadFilterNode;

    /**
     * Gain node.
     */
    private _gainNode: GainNode;

    /**
     * Media filter source.
     */
    private _source: MediaElementAudioSourceNode;

    /**
     * HTML audio element.
     */
    private _ref: HTMLAudioElement;

    constructor(audioElement: HTMLAudioElement) {
        this._ref = audioElement;

        // Initialize the AudioContext
        this._audioContext = new AudioContext();
        
        // Create the source node from the audio element
        this._source = this._audioContext.createMediaElementSource(this._ref);
        
        // Create the low-pass filter
        this._filter = this._audioContext.createBiquadFilter();
        this._filter.type = "lowpass";
        this._filter.frequency.value = 10; // Set cutoff frequency to 1kHz for demonstration. Adjust as needed.

        this._gainNode = this._audioContext.createGain();
        this._gainNode.gain.value = 0;

        // Connect the audio chain
        this._source.connect(this._filter);
        this._filter.connect(this._gainNode);
        this._gainNode.connect(this._audioContext.destination);
    }
}