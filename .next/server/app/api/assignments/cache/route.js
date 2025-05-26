/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/assignments/cache/route";
exports.ids = ["app/api/assignments/cache/route"];
exports.modules = {

/***/ "(rsc)/./app/api/assignments/cache/route.ts":
/*!********************************************!*\
  !*** ./app/api/assignments/cache/route.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/supabase/client */ \"(rsc)/./lib/supabase/client.ts\");\n// app/api/assignments/cache/route.ts\n\n\n\n// GET - Return all cached assignments\nasync function GET() {\n    try {\n        // First try to get from cache\n        let cachedAssignments = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.assignmentCache.findMany();\n        // If cache is empty, fetch from Supabase and populate cache\n        if (!cachedAssignments || cachedAssignments.length === 0) {\n            const { data: supabaseData, error: supabaseError } = await _lib_supabase_client__WEBPACK_IMPORTED_MODULE_2__.supabase.from('op_bus_assignments').select('*');\n            if (supabaseError) {\n                throw new Error(supabaseError.message);\n            }\n            // Populate cache with Supabase data\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.assignmentCache.createMany({\n                data: supabaseData.map((assignment)=>({\n                        assignment_id: assignment.assignment_id,\n                        bus_bodynumber: assignment.bus_bodynumber,\n                        bus_platenumber: assignment.bus_platenumber,\n                        bus_route: assignment.bus_route,\n                        bus_type: assignment.bus_type,\n                        driver_name: assignment.driver_name,\n                        conductor_name: assignment.conductor_name,\n                        date_assigned: new Date(assignment.date_assigned),\n                        trip_fuel_expense: assignment.trip_fuel_expense,\n                        trip_revenue: assignment.trip_revenue,\n                        is_revenue_recorded: assignment.is_revenue_recorded,\n                        is_expense_recorded: assignment.is_expense_recorded,\n                        assignment_type: assignment.assignment_type\n                    }))\n            });\n            // Get the newly cached assignments\n            cachedAssignments = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.assignmentCache.findMany();\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            data: cachedAssignments\n        });\n    } catch (error) {\n        console.error('Error checking/populating cache:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Failed to get assignments'\n        }, {\n            status: 500\n        });\n    }\n}\n// POST - Update cache with new assignments\nasync function POST() {\n    try {\n        const { data: supabaseData, error: supabaseError } = await _lib_supabase_client__WEBPACK_IMPORTED_MODULE_2__.supabase.from('op_bus_assignments').select('*');\n        if (supabaseError) {\n            throw new Error(supabaseError.message);\n        }\n        // Begin transaction\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.$transaction(async (tx)=>{\n            // Clear existing cache\n            await tx.assignmentCache.deleteMany({});\n            // Insert new cache entries\n            await tx.assignmentCache.createMany({\n                data: supabaseData.map((assignment)=>({\n                        assignment_id: assignment.assignment_id,\n                        bus_bodynumber: assignment.bus_bodynumber,\n                        bus_platenumber: assignment.bus_platenumber,\n                        bus_route: assignment.bus_route,\n                        bus_type: assignment.bus_type,\n                        driver_name: assignment.driver_name,\n                        conductor_name: assignment.conductor_name,\n                        date_assigned: new Date(assignment.date_assigned),\n                        trip_fuel_expense: assignment.trip_fuel_expense,\n                        trip_revenue: assignment.trip_revenue,\n                        is_revenue_recorded: assignment.is_revenue_recorded,\n                        is_expense_recorded: assignment.is_expense_recorded,\n                        assignment_type: assignment.assignment_type\n                    }))\n            });\n        });\n        const updatedCache = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.assignmentCache.findMany();\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            data: updatedCache\n        });\n    } catch (error) {\n        console.error('Error updating cache:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Failed to update cache'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Fzc2lnbm1lbnRzL2NhY2hlL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ0E7QUFDSztBQUNNO0FBR2hELHNDQUFzQztBQUMvQixlQUFlRztJQUNwQixJQUFJO1FBQ0YsOEJBQThCO1FBQzlCLElBQUlDLG9CQUFvQixNQUFNSiwrQ0FBTUEsQ0FBQ0ssZUFBZSxDQUFDQyxRQUFRO1FBRTdELDREQUE0RDtRQUM1RCxJQUFJLENBQUNGLHFCQUFxQkEsa0JBQWtCRyxNQUFNLEtBQUssR0FBRztZQUN4RCxNQUFNLEVBQUVDLE1BQU1DLFlBQVksRUFBRUMsT0FBT0MsYUFBYSxFQUFFLEdBQUcsTUFBTVQsMERBQVFBLENBQ2hFVSxJQUFJLENBQUMsc0JBQ0xDLE1BQU0sQ0FBQztZQUVWLElBQUlGLGVBQWU7Z0JBQ2pCLE1BQU0sSUFBSUcsTUFBTUgsY0FBY0ksT0FBTztZQUN2QztZQUVBLG9DQUFvQztZQUNwQyxNQUFNZiwrQ0FBTUEsQ0FBQ0ssZUFBZSxDQUFDVyxVQUFVLENBQUM7Z0JBQ3RDUixNQUFNQyxhQUFhUSxHQUFHLENBQUMsQ0FBQ0MsYUFBNEI7d0JBQ2xEQyxlQUFlRCxXQUFXQyxhQUFhO3dCQUN2Q0MsZ0JBQWdCRixXQUFXRSxjQUFjO3dCQUN6Q0MsaUJBQWlCSCxXQUFXRyxlQUFlO3dCQUMzQ0MsV0FBV0osV0FBV0ksU0FBUzt3QkFDL0JDLFVBQVVMLFdBQVdLLFFBQVE7d0JBQzdCQyxhQUFhTixXQUFXTSxXQUFXO3dCQUNuQ0MsZ0JBQWdCUCxXQUFXTyxjQUFjO3dCQUN6Q0MsZUFBZSxJQUFJQyxLQUFLVCxXQUFXUSxhQUFhO3dCQUNoREUsbUJBQW1CVixXQUFXVSxpQkFBaUI7d0JBQy9DQyxjQUFjWCxXQUFXVyxZQUFZO3dCQUNyQ0MscUJBQXFCWixXQUFXWSxtQkFBbUI7d0JBQ25EQyxxQkFBcUJiLFdBQVdhLG1CQUFtQjt3QkFDbkRDLGlCQUFpQmQsV0FBV2MsZUFBZTtvQkFDN0M7WUFDRjtZQUVBLG1DQUFtQztZQUNuQzVCLG9CQUFvQixNQUFNSiwrQ0FBTUEsQ0FBQ0ssZUFBZSxDQUFDQyxRQUFRO1FBQzNEO1FBRUEsT0FBT0wscURBQVlBLENBQUNnQyxJQUFJLENBQUM7WUFBRXpCLE1BQU1KO1FBQWtCO0lBQ3JELEVBQUUsT0FBT00sT0FBTztRQUNkd0IsUUFBUXhCLEtBQUssQ0FBQyxvQ0FBb0NBO1FBQ2xELE9BQU9ULHFEQUFZQSxDQUFDZ0MsSUFBSSxDQUFDO1lBQUV2QixPQUFPO1FBQTRCLEdBQUc7WUFBRXlCLFFBQVE7UUFBSTtJQUNqRjtBQUNGO0FBRUEsMkNBQTJDO0FBQ3BDLGVBQWVDO0lBQ3BCLElBQUk7UUFDRixNQUFNLEVBQUU1QixNQUFNQyxZQUFZLEVBQUVDLE9BQU9DLGFBQWEsRUFBRSxHQUFHLE1BQU1ULDBEQUFRQSxDQUNoRVUsSUFBSSxDQUFDLHNCQUNMQyxNQUFNLENBQUM7UUFFVixJQUFJRixlQUFlO1lBQ2pCLE1BQU0sSUFBSUcsTUFBTUgsY0FBY0ksT0FBTztRQUN2QztRQUVBLG9CQUFvQjtRQUNwQixNQUFNZiwrQ0FBTUEsQ0FBQ3FDLFlBQVksQ0FBQyxPQUFPQztZQUMvQix1QkFBdUI7WUFDdkIsTUFBTUEsR0FBR2pDLGVBQWUsQ0FBQ2tDLFVBQVUsQ0FBQyxDQUFDO1lBRXJDLDJCQUEyQjtZQUMzQixNQUFNRCxHQUFHakMsZUFBZSxDQUFDVyxVQUFVLENBQUM7Z0JBQ2xDUixNQUFNQyxhQUFhUSxHQUFHLENBQUMsQ0FBQ0MsYUFBNEI7d0JBQ2xEQyxlQUFlRCxXQUFXQyxhQUFhO3dCQUN2Q0MsZ0JBQWdCRixXQUFXRSxjQUFjO3dCQUN6Q0MsaUJBQWlCSCxXQUFXRyxlQUFlO3dCQUMzQ0MsV0FBV0osV0FBV0ksU0FBUzt3QkFDL0JDLFVBQVVMLFdBQVdLLFFBQVE7d0JBQzdCQyxhQUFhTixXQUFXTSxXQUFXO3dCQUNuQ0MsZ0JBQWdCUCxXQUFXTyxjQUFjO3dCQUN6Q0MsZUFBZSxJQUFJQyxLQUFLVCxXQUFXUSxhQUFhO3dCQUNoREUsbUJBQW1CVixXQUFXVSxpQkFBaUI7d0JBQy9DQyxjQUFjWCxXQUFXVyxZQUFZO3dCQUNyQ0MscUJBQXFCWixXQUFXWSxtQkFBbUI7d0JBQ25EQyxxQkFBcUJiLFdBQVdhLG1CQUFtQjt3QkFDbkRDLGlCQUFpQmQsV0FBV2MsZUFBZTtvQkFDN0M7WUFDRjtRQUNGO1FBRUEsTUFBTVEsZUFBZSxNQUFNeEMsK0NBQU1BLENBQUNLLGVBQWUsQ0FBQ0MsUUFBUTtRQUMxRCxPQUFPTCxxREFBWUEsQ0FBQ2dDLElBQUksQ0FBQztZQUFFekIsTUFBTWdDO1FBQWE7SUFDaEQsRUFBRSxPQUFPOUIsT0FBTztRQUNkd0IsUUFBUXhCLEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE9BQU9ULHFEQUFZQSxDQUFDZ0MsSUFBSSxDQUFDO1lBQUV2QixPQUFPO1FBQXlCLEdBQUc7WUFBRXlCLFFBQVE7UUFBSTtJQUM5RTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEJyaWFuIENhdWJlXFxPbmVEcml2ZVxcRG9jdW1lbnRzXFxjYXBzdG9uZVxcRlRNU1xcRlRNU19KT0VMXFxmdG1zXFxhcHBcXGFwaVxcYXNzaWdubWVudHNcXGNhY2hlXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2Fzc2lnbm1lbnRzL2NhY2hlL3JvdXRlLnRzXHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSAnQC9saWIvc3VwYWJhc2UvY2xpZW50J1xyXG5pbXBvcnQgdHlwZSB7IEFzc2lnbm1lbnQgfSBmcm9tICdAL2xpYi9zdXBhYmFzZS9hc3NpZ25tZW50cydcclxuXHJcbi8vIEdFVCAtIFJldHVybiBhbGwgY2FjaGVkIGFzc2lnbm1lbnRzXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIEZpcnN0IHRyeSB0byBnZXQgZnJvbSBjYWNoZVxyXG4gICAgbGV0IGNhY2hlZEFzc2lnbm1lbnRzID0gYXdhaXQgcHJpc21hLmFzc2lnbm1lbnRDYWNoZS5maW5kTWFueSgpO1xyXG4gICAgXHJcbiAgICAvLyBJZiBjYWNoZSBpcyBlbXB0eSwgZmV0Y2ggZnJvbSBTdXBhYmFzZSBhbmQgcG9wdWxhdGUgY2FjaGVcclxuICAgIGlmICghY2FjaGVkQXNzaWdubWVudHMgfHwgY2FjaGVkQXNzaWdubWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IHsgZGF0YTogc3VwYWJhc2VEYXRhLCBlcnJvcjogc3VwYWJhc2VFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbSgnb3BfYnVzX2Fzc2lnbm1lbnRzJylcclxuICAgICAgICAuc2VsZWN0KCcqJyk7XHJcblxyXG4gICAgICBpZiAoc3VwYWJhc2VFcnJvcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzdXBhYmFzZUVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQb3B1bGF0ZSBjYWNoZSB3aXRoIFN1cGFiYXNlIGRhdGFcclxuICAgICAgYXdhaXQgcHJpc21hLmFzc2lnbm1lbnRDYWNoZS5jcmVhdGVNYW55KHtcclxuICAgICAgICBkYXRhOiBzdXBhYmFzZURhdGEubWFwKChhc3NpZ25tZW50OiBBc3NpZ25tZW50KSA9PiAoe1xyXG4gICAgICAgICAgYXNzaWdubWVudF9pZDogYXNzaWdubWVudC5hc3NpZ25tZW50X2lkLFxyXG4gICAgICAgICAgYnVzX2JvZHludW1iZXI6IGFzc2lnbm1lbnQuYnVzX2JvZHludW1iZXIsXHJcbiAgICAgICAgICBidXNfcGxhdGVudW1iZXI6IGFzc2lnbm1lbnQuYnVzX3BsYXRlbnVtYmVyLFxyXG4gICAgICAgICAgYnVzX3JvdXRlOiBhc3NpZ25tZW50LmJ1c19yb3V0ZSxcclxuICAgICAgICAgIGJ1c190eXBlOiBhc3NpZ25tZW50LmJ1c190eXBlLFxyXG4gICAgICAgICAgZHJpdmVyX25hbWU6IGFzc2lnbm1lbnQuZHJpdmVyX25hbWUsXHJcbiAgICAgICAgICBjb25kdWN0b3JfbmFtZTogYXNzaWdubWVudC5jb25kdWN0b3JfbmFtZSxcclxuICAgICAgICAgIGRhdGVfYXNzaWduZWQ6IG5ldyBEYXRlKGFzc2lnbm1lbnQuZGF0ZV9hc3NpZ25lZCksXHJcbiAgICAgICAgICB0cmlwX2Z1ZWxfZXhwZW5zZTogYXNzaWdubWVudC50cmlwX2Z1ZWxfZXhwZW5zZSxcclxuICAgICAgICAgIHRyaXBfcmV2ZW51ZTogYXNzaWdubWVudC50cmlwX3JldmVudWUsXHJcbiAgICAgICAgICBpc19yZXZlbnVlX3JlY29yZGVkOiBhc3NpZ25tZW50LmlzX3JldmVudWVfcmVjb3JkZWQsXHJcbiAgICAgICAgICBpc19leHBlbnNlX3JlY29yZGVkOiBhc3NpZ25tZW50LmlzX2V4cGVuc2VfcmVjb3JkZWQsXHJcbiAgICAgICAgICBhc3NpZ25tZW50X3R5cGU6IGFzc2lnbm1lbnQuYXNzaWdubWVudF90eXBlXHJcbiAgICAgICAgfSkpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBuZXdseSBjYWNoZWQgYXNzaWdubWVudHNcclxuICAgICAgY2FjaGVkQXNzaWdubWVudHMgPSBhd2FpdCBwcmlzbWEuYXNzaWdubWVudENhY2hlLmZpbmRNYW55KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZGF0YTogY2FjaGVkQXNzaWdubWVudHMgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNoZWNraW5nL3BvcHVsYXRpbmcgY2FjaGU6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gZ2V0IGFzc2lnbm1lbnRzJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUE9TVCAtIFVwZGF0ZSBjYWNoZSB3aXRoIG5ldyBhc3NpZ25tZW50c1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVCgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBkYXRhOiBzdXBhYmFzZURhdGEsIGVycm9yOiBzdXBhYmFzZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgnb3BfYnVzX2Fzc2lnbm1lbnRzJylcclxuICAgICAgLnNlbGVjdCgnKicpO1xyXG5cclxuICAgIGlmIChzdXBhYmFzZUVycm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihzdXBhYmFzZUVycm9yLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJlZ2luIHRyYW5zYWN0aW9uXHJcbiAgICBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKGFzeW5jICh0eCkgPT4ge1xyXG4gICAgICAvLyBDbGVhciBleGlzdGluZyBjYWNoZVxyXG4gICAgICBhd2FpdCB0eC5hc3NpZ25tZW50Q2FjaGUuZGVsZXRlTWFueSh7fSk7XHJcblxyXG4gICAgICAvLyBJbnNlcnQgbmV3IGNhY2hlIGVudHJpZXNcclxuICAgICAgYXdhaXQgdHguYXNzaWdubWVudENhY2hlLmNyZWF0ZU1hbnkoe1xyXG4gICAgICAgIGRhdGE6IHN1cGFiYXNlRGF0YS5tYXAoKGFzc2lnbm1lbnQ6IEFzc2lnbm1lbnQpID0+ICh7XHJcbiAgICAgICAgICBhc3NpZ25tZW50X2lkOiBhc3NpZ25tZW50LmFzc2lnbm1lbnRfaWQsXHJcbiAgICAgICAgICBidXNfYm9keW51bWJlcjogYXNzaWdubWVudC5idXNfYm9keW51bWJlcixcclxuICAgICAgICAgIGJ1c19wbGF0ZW51bWJlcjogYXNzaWdubWVudC5idXNfcGxhdGVudW1iZXIsXHJcbiAgICAgICAgICBidXNfcm91dGU6IGFzc2lnbm1lbnQuYnVzX3JvdXRlLFxyXG4gICAgICAgICAgYnVzX3R5cGU6IGFzc2lnbm1lbnQuYnVzX3R5cGUsXHJcbiAgICAgICAgICBkcml2ZXJfbmFtZTogYXNzaWdubWVudC5kcml2ZXJfbmFtZSxcclxuICAgICAgICAgIGNvbmR1Y3Rvcl9uYW1lOiBhc3NpZ25tZW50LmNvbmR1Y3Rvcl9uYW1lLFxyXG4gICAgICAgICAgZGF0ZV9hc3NpZ25lZDogbmV3IERhdGUoYXNzaWdubWVudC5kYXRlX2Fzc2lnbmVkKSxcclxuICAgICAgICAgIHRyaXBfZnVlbF9leHBlbnNlOiBhc3NpZ25tZW50LnRyaXBfZnVlbF9leHBlbnNlLFxyXG4gICAgICAgICAgdHJpcF9yZXZlbnVlOiBhc3NpZ25tZW50LnRyaXBfcmV2ZW51ZSxcclxuICAgICAgICAgIGlzX3JldmVudWVfcmVjb3JkZWQ6IGFzc2lnbm1lbnQuaXNfcmV2ZW51ZV9yZWNvcmRlZCxcclxuICAgICAgICAgIGlzX2V4cGVuc2VfcmVjb3JkZWQ6IGFzc2lnbm1lbnQuaXNfZXhwZW5zZV9yZWNvcmRlZCxcclxuICAgICAgICAgIGFzc2lnbm1lbnRfdHlwZTogYXNzaWdubWVudC5hc3NpZ25tZW50X3R5cGVcclxuICAgICAgICB9KSlcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVkQ2FjaGUgPSBhd2FpdCBwcmlzbWEuYXNzaWdubWVudENhY2hlLmZpbmRNYW55KCk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBkYXRhOiB1cGRhdGVkQ2FjaGUgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIGNhY2hlOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIHVwZGF0ZSBjYWNoZScgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsicHJpc21hIiwiTmV4dFJlc3BvbnNlIiwic3VwYWJhc2UiLCJHRVQiLCJjYWNoZWRBc3NpZ25tZW50cyIsImFzc2lnbm1lbnRDYWNoZSIsImZpbmRNYW55IiwibGVuZ3RoIiwiZGF0YSIsInN1cGFiYXNlRGF0YSIsImVycm9yIiwic3VwYWJhc2VFcnJvciIsImZyb20iLCJzZWxlY3QiLCJFcnJvciIsIm1lc3NhZ2UiLCJjcmVhdGVNYW55IiwibWFwIiwiYXNzaWdubWVudCIsImFzc2lnbm1lbnRfaWQiLCJidXNfYm9keW51bWJlciIsImJ1c19wbGF0ZW51bWJlciIsImJ1c19yb3V0ZSIsImJ1c190eXBlIiwiZHJpdmVyX25hbWUiLCJjb25kdWN0b3JfbmFtZSIsImRhdGVfYXNzaWduZWQiLCJEYXRlIiwidHJpcF9mdWVsX2V4cGVuc2UiLCJ0cmlwX3JldmVudWUiLCJpc19yZXZlbnVlX3JlY29yZGVkIiwiaXNfZXhwZW5zZV9yZWNvcmRlZCIsImFzc2lnbm1lbnRfdHlwZSIsImpzb24iLCJjb25zb2xlIiwic3RhdHVzIiwiUE9TVCIsIiR0cmFuc2FjdGlvbiIsInR4IiwiZGVsZXRlTWFueSIsInVwZGF0ZWRDYWNoZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/assignments/cache/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXFDLEVBQUU7SUFDekNILGdCQUFnQkUsTUFBTSxHQUFHQTtBQUMzQiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxCcmlhbiBDYXViZVxcT25lRHJpdmVcXERvY3VtZW50c1xcY2Fwc3RvbmVcXEZUTVNcXEZUTVNfSk9FTFxcZnRtc1xcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xyXG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IG5ldyBQcmlzbWFDbGllbnQoKVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hXHJcbn0iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase/client.ts":
/*!********************************!*\
  !*** ./lib/supabase/client.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createClient: () => (/* reexport safe */ _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient),\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n// lib\\supabase\\client.ts\n\nconst supabaseUrl = \"https://dyvxlzuhnamrnqppehnv.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5dnhsenVobmFtcm5xcHBlaG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDM4ODUsImV4cCI6MjA2MzgxOTg4NX0.CKQLXvc4UUf55PHOj8FQuH-JeqVVpv1i4cwjKTVYxeE\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Export createClient for use in other files\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UvY2xpZW50LnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlCQUF5QjtBQUMyQjtBQUVwRCxNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsa0JBQWtCSCxrTkFBeUM7QUFFMUQsTUFBTUssV0FBV1AsbUVBQVlBLENBQUNDLGFBQWFJLGlCQUFnQjtBQUVsRSw2Q0FBNkM7QUFDdEIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQnJpYW4gQ2F1YmVcXE9uZURyaXZlXFxEb2N1bWVudHNcXGNhcHN0b25lXFxGVE1TXFxGVE1TX0pPRUxcXGZ0bXNcXGxpYlxcc3VwYWJhc2VcXGNsaWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsaWJcXHN1cGFiYXNlXFxjbGllbnQudHNcclxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xyXG5cclxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXHJcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIVxyXG5cclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXkpXHJcblxyXG4vLyBFeHBvcnQgY3JlYXRlQ2xpZW50IGZvciB1c2UgaW4gb3RoZXIgZmlsZXNcclxuZXhwb3J0IHsgY3JlYXRlQ2xpZW50IH0iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJzdXBhYmFzZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase/client.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassignments%2Fcache%2Froute&page=%2Fapi%2Fassignments%2Fcache%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassignments%2Fcache%2Froute.ts&appDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassignments%2Fcache%2Froute&page=%2Fapi%2Fassignments%2Fcache%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassignments%2Fcache%2Froute.ts&appDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Brian_Caube_OneDrive_Documents_capstone_FTMS_FTMS_JOEL_ftms_app_api_assignments_cache_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/assignments/cache/route.ts */ \"(rsc)/./app/api/assignments/cache/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/assignments/cache/route\",\n        pathname: \"/api/assignments/cache\",\n        filename: \"route\",\n        bundlePath: \"app/api/assignments/cache/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Brian Caube\\\\OneDrive\\\\Documents\\\\capstone\\\\FTMS\\\\FTMS_JOEL\\\\ftms\\\\app\\\\api\\\\assignments\\\\cache\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Brian_Caube_OneDrive_Documents_capstone_FTMS_FTMS_JOEL_ftms_app_api_assignments_cache_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhc3NpZ25tZW50cyUyRmNhY2hlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhc3NpZ25tZW50cyUyRmNhY2hlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXNzaWdubWVudHMlMkZjYWNoZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNCcmlhbiUyMENhdWJlJTVDT25lRHJpdmUlNUNEb2N1bWVudHMlNUNjYXBzdG9uZSU1Q0ZUTVMlNUNGVE1TX0pPRUwlNUNmdG1zJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNCcmlhbiUyMENhdWJlJTVDT25lRHJpdmUlNUNEb2N1bWVudHMlNUNjYXBzdG9uZSU1Q0ZUTVMlNUNGVE1TX0pPRUwlNUNmdG1zJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNvRTtBQUNqSjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQnJpYW4gQ2F1YmVcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXGNhcHN0b25lXFxcXEZUTVNcXFxcRlRNU19KT0VMXFxcXGZ0bXNcXFxcYXBwXFxcXGFwaVxcXFxhc3NpZ25tZW50c1xcXFxjYWNoZVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXNzaWdubWVudHMvY2FjaGUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hc3NpZ25tZW50cy9jYWNoZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXNzaWdubWVudHMvY2FjaGUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxCcmlhbiBDYXViZVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcY2Fwc3RvbmVcXFxcRlRNU1xcXFxGVE1TX0pPRUxcXFxcZnRtc1xcXFxhcHBcXFxcYXBpXFxcXGFzc2lnbm1lbnRzXFxcXGNhY2hlXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassignments%2Fcache%2Froute&page=%2Fapi%2Fassignments%2Fcache%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassignments%2Fcache%2Froute.ts&appDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/whatwg-url","vendor-chunks/tr46","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fassignments%2Fcache%2Froute&page=%2Fapi%2Fassignments%2Fcache%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fassignments%2Fcache%2Froute.ts&appDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBrian%20Caube%5COneDrive%5CDocuments%5Ccapstone%5CFTMS%5CFTMS_JOEL%5Cftms&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();