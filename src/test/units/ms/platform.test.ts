import { expect } from 'chai';
import * as fs from 'fs-extra';
import * as ms from '../../../ms';

describe('ms.teamExist', () => {
    it('should check team existing', async () => {
        let result = await ms.teamExist('Kubeworkz Cloud Computing Front End');
        expect(result).to.be.true;
    });
});
