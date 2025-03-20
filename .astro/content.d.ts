import { DataEntry } from 'astro:content';

declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	// export type ContentCollectionKey = keyof ContentEntryMap;
	export type UniqueDataCollectionKey = keyof DataEntry;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ContentEntryMap = Record<string, any>;

	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export type ReferenceDataEntry<
		C extends keyof DataEntry,
		E extends keyof DataEntry[C],
	> = DataEntry[C][E];
}
