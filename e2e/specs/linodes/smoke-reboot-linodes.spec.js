const { constants } = require('../../constants');

import { flatten } from 'ramda';
import { apiCreateLinode, apiDeleteAllLinodes } from '../../utils/common';
import ListLinodes from '../../pageobjects/list-linodes';

describe('List Linodes - Actions - Reboot Suite', () => {
    const rebootTimeout = constants.wait.minute * 3;

    beforeAll(() => {
        browser.url(constants.routes.linodes);
        apiCreateLinode();

        browser.waitForVisible('[data-qa-linode]', constants.wait.normal);
    });

    afterAll(() => {
        apiDeleteAllLinodes();
    });

    describe('Grid View Reboot - Suite', () => {
        let linodes;

        it('should reboot linode on click', () => {
            linodes = ListLinodes.linode;
            linodes[0].$(ListLinodes.rebootButton.selector).click();
            ListLinodes.acceptDialog('Confirm Reboot');
        });

        it('should update status on reboot to rebooting', () => {
            browser.waitUntil(function() {
                const currentStatus = linodes[0].$(ListLinodes.status.selector).getAttribute('data-qa-status');
                return currentStatus === 'rebooting';
            }, 10000);
        });

        it('should display running status after booted', () => {
            browser.waitUntil(function() {
                return linodes[0].$(ListLinodes.status.selector).getAttribute('data-qa-status') === 'running';
            }, rebootTimeout);
        });

        it('should display all grid view elements after reboot', () => {
            ListLinodes.gridElemsDisplay();
        });
    });

    describe('List View Reboot - Suite', () => {
        let totalLinodes;

        beforeAll(() => {
            ListLinodes.switchView('list');
            ListLinodes.tableHead.waitForVisible(constants.wait.normal);
            totalLinodes = ListLinodes.linode.length;
        });

        it('should reboot linode on click', () => {
            ListLinodes.selectActionMenuItem(ListLinodes.linode[0], 'Reboot');
            ListLinodes.acceptDialog('Confirm Reboot');
            browser.waitForVisible('[data-qa-loading]', constants.wait.normal);
        });

        it('should update status on reboot to rebooting', () => {
            browser.waitForVisible('[data-qa-status="rebooting"]', constants.wait.normal);
        });

        it('should hide action menu', () => {
            // Wait for action menu to no longer be visible
            browser.waitUntil(function() {
                const actionMenuMap = flatten(ListLinodes.linode.map(l => l.$(ListLinodes.linodeActionMenu.selector)));
                return actionMenuMap.length === totalLinodes -1;
            }, 10000);
        });

        it('should display running status after booted', () => {
            browser.waitForVisible('[data-qa-status="running"]', rebootTimeout);
        });

        it('should display all list view elements after reboot', () => {
            ListLinodes.listElemsDisplay();
        });
    });
});
