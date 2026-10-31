export default function SquirrelCharacter({ state = 'idle', className = '' }) {
  return (
    <svg
      className={`pixel-squirrel pixel-squirrel--${state} ${className}`.trim()}
      viewBox="0 0 96 112"
      role="img"
      aria-label={`Squirrel ${state}`}
      shapeRendering="crispEdges"
    >
      <g className="pixel-squirrel__tail">
        <path
          fill="#392735"
          d="M37 99H20V93H12V84H6V68H10V53H17V42H28V33H43V37H54V45H63V58H59V71H51V83H42V93H37Z"
        />
        <path
          fill="#9d503b"
          d="M35 90H23V84H16V69H20V56H28V48H39V45H49V52H56V63H51V74H45V82H38Z"
        />
        <path
          fill="#e88a4d"
          d="M34 81H25V75H21V65H25V57H31V52H40V51H47V57H51V64H47V72H42V78H36Z"
        />
        <path
          fill="#ffd28c"
          d="M35 72H29V67H33V61H39V59H45V63H43V69H39V73Z"
        />
        <path fill="#f3a65c" d="M18 68H14V61H18V55H22V62H19V68Z" />
      </g>

      <g className="pixel-squirrel__body">
        <path fill="#392735" d="M35 104V75H41V66H62V71H70V82H76V102H69V108H43V104Z" />
        <path fill="#b85c3d" d="M40 99V78H45V71H60V76H67V84H71V100H65V103H45V99Z" />
        <path fill="#e88a4d" d="M44 97V80H49V75H59V80H63V87H67V98H61V101H48V97Z" />
        <path fill="#ffe2b0" d="M50 86H60V91H64V98H59V101H51V96H47V91H50Z" />
        <path fill="#392735" d="M39 99H48V105H42V109H31V105H35V101H39Z" />
        <path fill="#f3b66f" d="M37 101H45V104H40V107H34V105H37Z" />
        <path fill="#392735" d="M63 99H72V105H77V109H65V105H60V102H63Z" />
        <path fill="#f3b66f" d="M64 102H70V105H75V107H67V104H62Z" />
      </g>

      <g className="pixel-squirrel__head">
        <path fill="#392735" d="M42 57V34H47V26H54V18H63V22H69V27H77V34H83V51H78V59H69V64H54V60H47V57Z" />
        <path fill="#b85c3d" d="M47 52V36H52V30H58V24H63V29H69V32H76V38H79V49H74V55H67V60H56V56H49V52Z" />
        <path fill="#f3a65c" d="M51 48V37H56V32H61V29H65V34H71V37H75V43H78V49H73V53H66V57H57V53H52Z" />
        <path fill="#ffe2b0" d="M58 48H66V45H74V49H70V54H65V57H59V54H55V51H58Z" />
        <path fill="#392735" d="M47 32V22H53V16H61V22H57V29H52V35Z" />
        <path fill="#f3a65c" d="M51 28V23H55V20H57V25H54V30Z" />
        <path fill="#392735" d="M65 27V21H71V23H76V31H72V27Z" />
        <path fill="#f3a65c" d="M68 26V24H71V27H74V29H71V27Z" />
        <path className="pixel-squirrel__eyes" fill="#302333" d="M65 39H69V44H65Z" />
        <path fill="#fff3d4" d="M66 39H67V41H66Z" />
        <path fill="#392735" d="M77 46H82V50H78V53H74V50H77Z" />
        <path fill="#fff3d4" d="M75 48H78V50H75Z" />
        <path fill="#a94f3c" d="M59 49H64V51H60Z" />
        <path fill="#e67c67" d="M69 51H73V53H69Z" />
      </g>

      <g className="pixel-squirrel__paws">
        <path fill="#392735" d="M67 68H77V72H83V78H80V81H73V77H68Z" />
        <path fill="#f3b66f" d="M70 70H77V74H81V77H78V79H74V76H70Z" />
        <path fill="#392735" d="M42 72H48V77H45V83H39V81H41V76Z" />
        <path fill="#f3b66f" d="M43 74H46V77H43V81H41V78Z" />
      </g>

      <g className="pixel-squirrel__sparkles" aria-hidden="true">
        <path fill="#7de8d1" d="M11 31H14V36H18V39H14V44H11V39H7V36H11Z" />
        <path fill="#ffd98a" d="M25 21H27V24H30V26H27V29H25V26H22V24H25Z" />
        <path fill="#7de8d1" d="M84 67H86V70H89V72H86V75H84V72H81V70H84Z" />
      </g>
    </svg>
  );
}
