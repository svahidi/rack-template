import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewContainerRef,
  ContentChild,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-rack-panel',
  templateUrl: './rack-panel.component.html',
  styleUrls: ['./rack-panel.component.scss']
})
export class RackPanelComponent implements OnInit {

  showServerData = false;

  @Input() view = false;
  @Input() rackSlot = 32;
  @Input() rackData: any = [];
  @Input() equipmentData: any;

  @Output() syncData: any = new EventEmitter();

  @ContentChild('slotTemplate') slotTemplate: TemplateRef<any>;


  constructor(
    private vcRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    if (!this.rackData.length) {
      this.createRack();
    }
  }

  createRack(): void {
    if (!this.rackData.length) {
      for (let i = 1; i <= this.rackSlot; i++) {
        this.rackData.push({id: i, status: 'available', equipment: ''});
      }
    }
  }

  close(): void {
    this.showServerData = false;
  }

  edit(slot): void {
    this.openAddEquipmentPopup(slot, 'edit');
  }

  addEquipment(slot): void {
    this.openAddEquipmentPopup(slot, 'add');
  }

  delete(slot): void {
    const id = (slot.slotRange.split('(')[0]).split(' - ');
    // this.confirmation.confirm('Delete Equipment', 'Are you sure do you want to delete this equipment?', this.vcRef, 'SAVE').subscribe(res => {
    //   if (res) {
    //     this.rackData.filter(x => x.id >= Number(id[0]) && x.id <= Number(id[1])).forEach(y => {
    //       y.equipment = '';
    //       y.status = 'available';
    //       y.hardware_name = '';
    //       y.type = '';
    //       y.role = '';
    //       y.slotRange = '';
    //       y.unitLength = '';
    //     });
    //     this.syncData.emit({action: 'delete'});
    //   }
    // });
  }

  copy(slot): void {
    if (this.rackData.filter(x => x.status === 'available') &&
      this.rackData.filter(x => x.status === 'available').length >= slot.unitLength) {
      for (let i of this.rackData.filter(x => x.status === 'available')) {
        if (this.checkAvailableUnit(slot.unitLength, i.id)) {
          this.openAddEquipmentPopup(slot, 'copy');
          break;
        }
      }
    }
  }

  checkAvailableUnit(unit, id): boolean {
    const findLocation = this.rackData.filter(x => x.id >= id && x.id < unit + id);
    return findLocation && findLocation.length && findLocation.length === unit && findLocation.every(y =>  y.status === 'available');
  }

  openAddEquipmentPopup(slot, action): void {
    this.syncData.emit({
      equipmentList: this.equipmentData ,
      equipmentData: action === 'add' ? {} : this.equipmentData.filter(x => x.id === slot.equipment)[0],
      rackData: this.rackData,
      action: action,
      slot: slot
    });
  }

}
