import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import {
    Component,
    ContentChild,
    Input,
    SimpleChanges,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
    selector: 'app-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrl: './dynamic-table.component.scss',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
})
export class DynamicTableComponent {
    @Input() hasCheck: boolean = false;
    @Input() hasActions: boolean = false;
    @Input() hasExpansion: boolean = false;
    @Input() paginate: boolean = false;
    @Input() filter: boolean = false;
    @Input() sortCols: string[] = [];
    @Input() stickyCols: string[] = [];
    @Input() headerAlias: { [header: string]: string } = {};
    @Input() colWidth: { [header: string]: string } = {};
    @Input('headers') displayedColumns: string[] = [];
    @Input() data: {}[] = [];

    dataSource: MatTableDataSource<{}>;
    columnsToDisplay: string[] = [];
    expandedRow: {};
    allChecked: boolean = false;

    @ViewChild(MatTable) table: MatTable<{}>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ContentChild('actionsTemplate') actionsTemplate: TemplateRef<any>;
    @ContentChild('expansionTemplate') expansionTemplate: TemplateRef<any>;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data']) {
            const buf = changes['data'].currentValue.slice();
            if (this.hasCheck) {
                buf.forEach((element: { [checkbox: string]: boolean }) => {
                    element['checkbox'] = false;
                });
            }
            this.dataSource = new MatTableDataSource(buf);
        }
        if (changes['displayedColumns']) {
            this.columnsToDisplay =
                changes['displayedColumns'].currentValue.slice();
            if (this.hasCheck) {
                this.columnsToDisplay.unshift('checkbox');
            }
            if (this.hasActions) {
                this.columnsToDisplay.push('actions');
            }
            if (this.hasExpansion) {
                this.columnsToDisplay.push('expand');
            }
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.table.updateStickyColumnStyles();
    }

    getColWidth(col: string) {
        return this.colWidth[col] ? this.colWidth[col] : null;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getSortStatus(col: string) {
        return this.sortCols.includes(col);
    }

    getStickyStatus(col: string) {
        return this.stickyCols.includes(col);
    }

    //checkbox functions start
    updateAllChecked() {
        this.allChecked =
            this.dataSource.data &&
            this.dataSource.data.every(
                (t: { [checkbox: string]: boolean }) => t['checkbox']
            );
    }

    someComplete(): boolean {
        if (this.dataSource.data == null) {
            return false;
        }
        return (
            this.dataSource.data.filter(
                (t: { [checkbox: string]: boolean }) => t['checkbox']
            ).length > 0 && !this.allChecked
        );
    }

    setAll(completed: boolean) {
        this.allChecked = completed;
        if (this.dataSource.data == null) {
            return;
        }
        this.dataSource.data.forEach(
            (t: { [checkbox: string]: boolean }) => (t['checkbox'] = completed)
        );
    }
    //checkbox functions end
}
