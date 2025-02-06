import { Component } from 'solid-js';

export const MusicPlayer: Component<{ title: string; src: string }> = props => (
	<figure class="music">
		<figcaption>
			{props.title} <a href={props.src}> (Download) </a>
		</figcaption>
		<audio controls src={props.src}></audio>
	</figure>
);
