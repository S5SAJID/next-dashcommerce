"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import debounce from "lodash.debounce";

import { useUnmount } from "./use-unmount";
import { useEffect, useMemo, useRef } from "react";

type DebounceOptions = {
	leading?: boolean;
	trailing?: boolean;
	maxWait?: number;
};

type ControlFunctions = {
	cancel: () => void;
	flush: () => void;
	isPending: () => boolean;
};

export type DebouncedState<T extends (...args: unknown[]) => ReturnType<T>> = ((
	...args: Parameters<T>
) => ReturnType<T> | undefined) &
	ControlFunctions;

export function useDebounceCallback<
	T extends (...args: unknown[]) => ReturnType<T>,
>(func: T, delay = 500, options?: DebounceOptions): DebouncedState<T> {
	const debouncedFunc = useRef<ReturnType<typeof debounce>>(null);

	useUnmount(() => {
		if (debouncedFunc.current) {
			debouncedFunc.current.cancel();
		}
	});

	const debounced = useMemo(() => {
		const debouncedFuncInstance = debounce(func, delay, options);

		const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) =>
			debouncedFuncInstance(...args);

		wrappedFunc.cancel = () => {
			debouncedFuncInstance.cancel();
		};

		wrappedFunc.isPending = () => !!debouncedFunc.current;

		wrappedFunc.flush = () => debouncedFuncInstance.flush();

		return wrappedFunc;
	}, [func, delay, options]);

	useEffect(() => {
		debouncedFunc.current = debounce(func, delay, options);
	}, [func, delay, options]);

	return debounced;
}
