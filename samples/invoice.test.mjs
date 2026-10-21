import test from 'node:test';
import assert from 'node:assert/strict';
import { toCents, recordPaymentOnce } from './invoice.mjs';

test('converts decimal strings precisely',()=>{assert.equal(toCents('12.30'),1230);assert.equal(toCents('0.01'),1);assert.equal(toCents('1'),100);});
test('rejects extra decimal places',()=>assert.throws(()=>toCents('1.001'),TypeError));
test('rejects negative and malformed input',()=>{for(const v of ['-1','1e3','1,000',' 1','01',''])assert.throws(()=>toCents(v),TypeError);});
test('rejects overflow',()=>assert.throws(()=>toCents('999999999999999'),RangeError));
test('records full payments once',()=>{const s=new Map();const a=recordPaymentOnce(s,{invoiceId:1,amount:'50.10'});const b=recordPaymentOnce(s,{invoiceId:1,amount:'50.10'});assert.equal(a.created,true);assert.equal(b.created,false);assert.equal(s.size,1);assert.deepEqual(a.record,b.record);});
test('rejects zero payments',()=>assert.throws(()=>recordPaymentOnce(new Map(),{invoiceId:1,amount:'0.00'}),RangeError));
test('rejects invalid invoice ids',()=>assert.throws(()=>recordPaymentOnce(new Map(),{invoiceId:-2,amount:'1.00'}),TypeError));