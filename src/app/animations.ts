import { animate, group, query, style, transition, trigger } from "@angular/animations";

const time = 400;
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('RegisterPage => ParticipantsPage', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
        })
      ]),
      query(':enter', [
        style({ left: '100%' })
      ], { optional: true }),
      query(':leave',style({ left: '0' }) , { optional: true }),
      group([
        query(':leave', [
          animate(`${time}ms ease-out`, style({ left: '-100%' }))
        ], { optional: true }),
        query(':enter', [
          animate(`${time}ms ease-out`, style({ left: '0%' }))
        ], { optional: true }),
      ])
    ]),
    transition('ParticipantsPage => RegisterPage', [
        query(':enter, :leave', [
            style({
              position: 'absolute',
            })
          ]),
          query(':enter', [
            style({ left: '-100%' })
          ], { optional: true }),
          query(':leave',style({ left: '0' }) , { optional: true }),
          group([
            query(':leave', [
              animate(`${time}ms ease-out`, style({ left: '100%' }))
            ], { optional: true }),
            query(':enter', [
              animate(`${time}ms ease-out`, style({ left: '0%' }))
            ], { optional: true }),
          ])  
    ]),
  ]);