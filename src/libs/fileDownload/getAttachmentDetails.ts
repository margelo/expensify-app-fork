import tryResolveUrlFromApiRoot from '@libs/tryResolveUrlFromApiRoot';
import CONST from '@src/CONST';
import type {GetAttachmentDetails} from './types';

/**
 * Extract the thumbnail URL, source URL and the original filename from the HTML.
 */
const getAttachmentDetails: GetAttachmentDetails = (html) => {
    // Files can be rendered either as anchor tag or as an image so based on that we have to form regex.
    const IS_IMAGE_TAG = /<img([\w\W]+?)\/>/i.test(html);
    const PREVIEW_SOURCE_REGEX = new RegExp(`${CONST.ATTACHMENT_PREVIEW_ATTRIBUTE}*=*"(.+?)"`, 'i');
    const SOURCE_REGEX = new RegExp(`${CONST.ATTACHMENT_SOURCE_ATTRIBUTE}*=*"(.+?)"`, 'i');
    const ORIGINAL_FILENAME_REGEX = IS_IMAGE_TAG ? new RegExp(`${CONST.ATTACHMENT_ORIGINAL_FILENAME_ATTRIBUTE}*=*"(.+?)"`, 'i') : new RegExp('<(?:a|video)[^>]*>([^<]+)</(?:a|video)>', 'i');
    if (!html) {
        return {
            previewSourceURL: null,
            sourceURL: null,
            originalFileName: null,
        };
    }

    // Files created/uploaded/hosted by App should resolve from API ROOT. Other URLs aren't modified
    const sourceURL = tryResolveUrlFromApiRoot(html.match(SOURCE_REGEX)?.[1] ?? '');
    const imageURL = IS_IMAGE_TAG ? tryResolveUrlFromApiRoot(html.match(PREVIEW_SOURCE_REGEX)?.[1] ?? '') : null;
    const previewSourceURL = IS_IMAGE_TAG ? imageURL : sourceURL;
    const originalFileName = html.match(ORIGINAL_FILENAME_REGEX)?.[1] ?? null;

    // Update the image URL so the images can be accessed depending on the config environment
    return {
        previewSourceURL,
        sourceURL,
        originalFileName,
    };
};

export default getAttachmentDetails;
