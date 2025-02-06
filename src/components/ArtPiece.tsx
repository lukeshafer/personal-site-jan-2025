import { Component } from 'solid-js';

export const ArtPiece: Component<{ src: string; title: string }> = props => (
	<figure>
		<img src={`/art/${props.src}`} width={400} />
		<figcaption>{props.title}</figcaption>
	</figure>
);
