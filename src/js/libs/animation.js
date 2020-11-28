
export function clamp (val, min, max) {
	if (min > max) {
		[max, min] = [min, max];
	}
	const cl = Math.max(min, Math.min(max, val));
	// console.log("clamp", val, cl);
	return cl;
}

export const line = (x, x1 = 0, y1 = 0, x2 = 1, y2 = 1, easingFn) => {
	if (easingFn) {
		return line(easingFn(line(x, x1, 0, x2, 1)), 0, y1, 1, y2);
	}
	return x2 === x1 ? y1 : ((x - x1) / (x2 - x1)) * (y2 - y1) + y1;
};

export const lineLimit = (x, x1 = 0, y1 = 0, x2 = 1, y2 = 1, easingFn) => {
	const min = Math.min(x1, x2);
	const max = Math.max(x1, x2);
	const limitedX = Math.max(min, Math.min(max, x));
	return line(limitedX, x1, y1, x2, y2, easingFn);
};


export const easing = {
	linear (t) { return t; },
	easeInQuad (pos) {return Math.pow(pos, 2);},
	easeOutQuad (pos) {return -(Math.pow((pos - 1), 2) - 1);},
	easeInOutQuad (pos) {
		if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 2);}
		return -0.5 * ((pos -= 2) * pos - 2);
	},
	easeInCubic (pos) {return Math.pow(pos, 3);},
	easeOutCubic (pos) {return (Math.pow((pos - 1), 3) + 1);},
	easeInOutCubic (pos) {
		if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 3);}
		return 0.5 * (Math.pow((pos - 2), 3) + 2);
	},
	easeInQuart (pos) {return Math.pow(pos, 4);},
	easeOutQuart (pos) {return -(Math.pow((pos - 1), 4) - 1);},
	easeInOutQuart (pos) {
		if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 4);}
		return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
	},
	easeInQuint (pos) {return Math.pow(pos, 5);},
	easeOutQuint (pos) {return (Math.pow((pos - 1), 5) + 1);},

	easeInOutQuint (pos) {
		if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 5);}
		return 0.5 * (Math.pow((pos - 2), 5) + 2);
	},
	easeInSine (pos) {return -Math.cos(pos * (Math.PI / 2)) + 1;},

	easeOutSine (pos) {return Math.sin(pos * (Math.PI / 2));},
	easeInOutSine (pos) {return (-0.5 * (Math.cos(Math.PI * pos) - 1));},
	easeInExpo (pos) {return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));},
	easeOutExpo (pos) {return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;},
	easeInOutExpo (pos) {
		if (pos === 0) {return 0;}
		if (pos === 1) {return 1;}
		if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(2, 10 * (pos - 1));}
		return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
	},
	easeInCirc (pos) {return -(Math.sqrt(1 - (pos * pos)) - 1);},
	easeOutCirc (pos) {return Math.sqrt(1 - Math.pow((pos - 1), 2));},
	easeInOutCirc (pos) {
		if ((pos /= 0.5) < 1) {return -0.5 * (Math.sqrt(1 - pos * pos) - 1);}
		return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
	},
	easeOutBounce (pos) {
		if ((pos) < (1 / 2.75)) {
			return (7.5625 * pos * pos);
		}
		else if (pos < (2 / 2.75)) {
			return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
		}
		else if (pos < (2.5 / 2.75)) {
			return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
		}
		else {
			return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
		}
	},
	easeInBack (pos) {
		const s = 1.70158;
		return (pos) * pos * ((s + 1) * pos - s);
	},
	easeOutBack (pos) {
		const s = 1.70158;
		return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
	},
	easeInOutBack (pos) {
		let s = 1.70158;
		if ((pos /= 0.5) < 1) {return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));}
		return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
	},
	elastic (pos) {return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;},
	swingFromTo (pos) {
		let s = 1.70158;
		return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
			0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
	},
	swingFrom (pos) {
		const s = 1.70158;
		return pos * pos * ((s + 1) * pos - s);
	},
	swingTo (pos) {
		const s = 1.70158;
		return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
	},
	bounce (pos) {
		if (pos < (1 / 2.75)) {
			return (7.5625 * pos * pos);
		}
		else if (pos < (2 / 2.75)) {
			return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
		}
		else if (pos < (2.5 / 2.75)) {
			return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
		}
		else {
			return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
		}
	},
	bouncePast (pos) {
		if (pos < (1 / 2.75)) {
			return (7.5625 * pos * pos);
		}
		else if (pos < (2 / 2.75)) {
			return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
		}
		else if (pos < (2.5 / 2.75)) {
			return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
		}
		else {
			return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
		}
	},
	easeFromTo (pos) {
		if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 4);}
		return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
	},
	easeFrom (pos) {
		return Math.pow(pos, 4);
	},
	easeTo (pos) {
		return Math.pow(pos, 0.25);
	},
};


export class Animation {
	constructor (options = {}, animator) {
		this.setAnimator(animator);
		if (options.group) {
			let duration = options.duration || 0;
			options.group.forEach(animation => duration = duration < animation.duration ? animation.duration : duration);
			options.duration = duration;
			const onStep = options.onStep;
			options.onStep = group => {
				options.group.forEach(animation => animation.step = group.value);
				onStep && onStep(group);
			};
			const onEnd = options.onEnd;
			options.onEnd = group => {
				options.group.forEach(animation => animation.end(true));
				onEnd && onEnd(this);
			};
		}

		this.options = Object.assign({from: 0, to: 1}, options);
		this.value = 0;
		this._step = 0;
		if (this.options.step) {
			this.step = options.step;
		}
	}
	get step () {
		return this._step;
	}
	set step (val) {
		this._step = clamp(val, 0, 1);
		const totalDuration = this.duration;
		if (totalDuration > 0) {
			const delayStart = (this.options.delayStart || 0) / totalDuration;
			const delayEnd = (this.options.delayEnd || 0) / totalDuration;
			this.value = lineLimit(this._step, delayStart, 0, 1 - delayEnd, 1);
		}
		else {
			this.value = this._step;
		}
		if (this.options.easingFn) {
			this.value = this.options.easingFn(this.value);
		}
		this.options.onStep && this.options.onStep(this);
	}
	incTime (deltaTime, triggerEnd = false) {
		deltaTime = deltaTime * (this.options.from > this.options.to ? -1 : 1);

		this.setStep(clamp(this.duration ? this.step + deltaTime / this.duration : this.options.to, this.options.from, this.options.to), triggerEnd);
	}
	get duration () {
		return (this.options.delayStart || 0) + (this.options.duration || 0) + (this.options.delayEnd || 0);
	}
	setStep (step, triggerEnd = false) {
		// console.log("step", step);
		this.step = step;
		if (this.step === this.options.to) {
			this.end();
		}
	}
	setAnimator (animator) {
		this.animator = animator;
	}
	end () {
		if (!this.ended) {
			this.ended = true;
			this.animator.remove(this);
			this.options.onEnd && this.options.onEnd(this);
			this.options.end && this.options.end(this);
		}
	}
	pause () {
		this.animator.remove(this);
	}
	play ({from, to, end} = {}) {
		this.ended = false;
		if (from != null) {
			this.options.from = from;
		}
		else {
			this.options.from = this.step;
		}
		if (to != null) {
			this.options.to = to;
		}
		this.options.end = end;
		this.animator.add(this);
	}
}

export class Animator {
	constructor () {
		this.animations = [];
		let lastTime;
		const frame = () => {
			const time = Date.now();
			const deltaTime = lastTime ? time - lastTime : 0;
			lastTime = time;
			this.tick(deltaTime);
			requestAnimationFrame(frame);
		};
		frame();
	}
	tick (deltaTime) {
		this.animations.forEach(animation => animation.incTime(deltaTime, true));
	}
	has (animation) {
		return this.animations.includes(animation);
	}
	add (animation) {
		if (!this.has(animation)) {
			this.animations.push(animation);
		}
	}
	remove (animation) {
		const idx = this.animations.indexOf(animation);
		if (idx >= 0) {
			this.animations.splice(idx, 1);
		}
	}
}
