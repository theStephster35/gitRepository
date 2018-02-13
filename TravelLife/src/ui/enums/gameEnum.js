var SpeciesEnum =
{
	HUMAN: "Human"
};

var AttributeEnum =
{
	HEALTH: "Health",
	SIGHT: "Sight",
	RECOVERY: "Recovery",
	ENDURANCE: "Endurance",
	CLIMB: "Climb",
	JUMP: "Jump",
	RUN: "Run"
};

var TileTypeEnum =
{
	BARRIER: "Barrier",
	DIRT: "Dirt",
	GROUND: "Ground",
	SKY: "Sky",
	WATER: "Water"
};

var ActionEnum =
{
	CLIMB_OVER: AttributeEnum.CLIMB + " Over",
	CLIMB_OFF: AttributeEnum.CLIMB + " Off",
	LET_GO: "Let Go",

	UP_LEFT: "upLeft",
	CLIMB_LEFT: AttributeEnum.CLIMB + " Left",

	UP: "up",
	CLIMB_UP: AttributeEnum.CLIMB + " Up",

	UP_RIGHT: "upRight",
	CLIMB_RIGHT: AttributeEnum.CLIMB + " Right",

	LEFT: "left",
	RUN_LEFT: AttributeEnum.RUN + " Left",

	CENTER: "center",
	STOP: "Stop",
	REST: "Rest",

	RIGHT: "right",
	RUN_RIGHT: AttributeEnum.RUN + " Right",

	DOWN_LEFT: "downLeft",

	DOWN: "down",
	CLIMB_DOWN: AttributeEnum.CLIMB + " Down",
	FALL: "Fall",
	LAND: "Land",

	DOWN_RIGHT: "downRight"
};
